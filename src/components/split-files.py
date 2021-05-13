#   install python3
#
#   install BeautifulSoup:
#   pip3 install beautifulsoup4
#
#   run script:
#   python3 spilt-files.py

import os
from bs4 import BeautifulSoup

for filename in os.listdir('./'):
    if filename.endswith(".vue") and filename[0] != '_':

        with open(filename, 'r', encoding='UTF8') as f:
            nav = {'template': 'pug', 'script': 'js', 'style': 'less'}

            name = os.path.splitext(filename)

            try:
                os.mkdir("./{}".format(name[0]))
            except OSError:
                pass

            work = BeautifulSoup(f, features="html.parser")

            with open('./{}/{}'.format(name[0], 'index.js'), 'w', encoding='UTF8') as indexjs:
                moduleName = ''

                for m in name[0].split('-'):
                    moduleName += m.capitalize()

                indexjs.write('import {} from "{}"; export default {};'.format(moduleName, name[0], moduleName))

            with open('./{}/{}'.format(name[0], filename), 'w', encoding='UTF8') as dup:
                for tag in nav:
                    found = work.find(tag, text=True)

                    if found:
                        with open("./{}/{}.{}".format(name[0], name[0], nav[tag]), "w", encoding='UTF8') as d:
                            text = ''.join(found)
                            d.write(text.replace("../", "../../"))

                        found['src'] = name[0] + '.' + nav[tag]
                        found.string = ''

                dup.write(str(work).replace('scoped=""', "scoped"))

print('split file complete')