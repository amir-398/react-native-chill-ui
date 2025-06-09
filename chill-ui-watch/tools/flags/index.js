const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const jsdom = require('jsdom');

const rootPath = process.cwd();
fs.readdir(path.resolve(rootPath, 'tools/flags/svg'), (err, files) => {
  const icons = {};
  files.forEach(file => {
    const filePath = path.join(rootPath, 'tools/flags/svg', file);
    const fileName = file.split('.')[0];
    const fileExt = file.split('.')[1];

    if (fileExt === 'svg') {
      const buffer = fs.readFileSync(filePath);
      const fileContent = buffer.toString();

      const dom = new jsdom.JSDOM(fileContent);
      const svg = dom.window.document.querySelector('svg');
      const viewBox = svg.getAttribute('viewBox');
      const paths = [];
      const pathsHTML = dom.window.document.querySelectorAll('path');

      pathsHTML.forEach(element => {
        const pathD = element.getAttribute('d');
        const fill = element.getAttribute('fill');
        if (pathD && pathD !== '') {
          paths.push({
            d: pathD,
            fill: fill || '#000000', // Utilise noir comme couleur par défaut si aucune n'est spécifiée
          });
        }
      });

      icons[fileName] = {
        path: paths,
        viewBox,
      };
    }
  });

  const iconObj = JSON.stringify(icons);

  // template for icons.tsx
  // export const ICONS: TIcon = iconObj as const

  fs.writeFileSync(
    path.resolve(rootPath, 'src/components/inputs/phoneNumberInput/flags/index.ts'),
    `export const FLAGS = ${iconObj} as const; 
     export type TFlags = typeof FLAGS;
     export const FLAGS_OPTIONS = Object.keys(FLAGS) as Array<keyof TFlags>;
    `,
  );
});
