#   install python3
#
#   install BeautifulSoup:
#   pip3 install beautifulsoup4
#
#   run script:
#   python3 spilt-files.py

import os
from bs4 import BeautifulSoup

license_text = """
/*
MIT License

Copyright (c) 2021 BROADWAY INC.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
"""

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

                            prefix = ''
                            if tag == 'script':
                                prefix = license_text

                            text = prefix + ''.join(found)
                            d.write(text.replace("../", "../../"))

                        found['src'] = name[0] + '.' + nav[tag]
                        found.string = ''

                dup.write(str(work).replace('scoped=""', "scoped"))

print('split file complete')
