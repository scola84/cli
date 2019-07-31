import { MysqlBuilder } from '@scola/doc';
import { Worker } from '@scola/worker';

import fs from 'fs-extra';
import beautify from 'js-beautify';
import upperFirst from 'lodash-es/upperFirst';
import qs from 'qs';
import readDir from 'recursive-readdir';

import {
  formatInput,
  formatList
} from './pkg/format';

export function pkg() {
  const builder = new MysqlBuilder({
    host: (box) => {
      return box.host + '/information_schema';
    },
    type: 'list'
  });

  builder.build(
    builder.query(
      builder.select('*'),
      builder.from('information_schema.COLUMNS'),
      builder.where(
        builder.and(
          builder.eq(
            'TABLE_SCHEMA',
            builder.string((box) => box.database)
          ),
          builder.eq(
            'TABLE_NAME',
            builder.string((box) => box.object)
          )
        )
      )
    )
  );

  const processor = new Worker({
    act(box, data, callback) {
      const bdir = __dirname.slice(0, -5) + '/src/cli/gen/pkg';
      const sdir = bdir + '/template';
      const tdir = process.cwd();

      const object = box.object;
      const objectLc = object;
      const objectUc = upperFirst(objectLc);

      const header = '/* provisioned by scola */';

      const options = {
        bdir,
        sdir,
        tdir,
        object
      };

      const columns = data.data.map((column) => {
        column.options = qs.parse(column.COLUMN_COMMENT);
        return column;
      });

      readDir(sdir, (error, files) => {
        files.forEach((source) => {
          const target = source
            .replace(sdir, tdir)
            .replace(/object/g, objectLc);

          let targetContent = null;

          try {
            targetContent = String(fs.readFileSync(target));
          } catch (e) {
            targetContent = header;
          }

          if (targetContent.slice(0, header.length) !== header) {
            return;
          }

          let sourceContent = String(fs.readFileSync(source));

          if (/list\.js$/.test(source)) {
            sourceContent = formatList(sourceContent, columns, options);
          }

          if (/input\.js$/.test(source)) {
            sourceContent = formatInput(sourceContent, columns, options);
          }

          sourceContent = sourceContent
            .replace(/__OBJECT_LC__/g, objectLc)
            .replace(/__OBJECT_UC__/g, objectUc);

          sourceContent = header + '\n\n' + sourceContent;

          sourceContent = beautify.js(sourceContent, {
            brace_style: 'collapse-preserve-inline',
            end_with_newline: true,
            indent_size: 2,
            max_preserve_newlines: 2
          });

          fs.ensureFileSync(target);
          fs.writeFileSync(target, sourceContent);
        });

        this.pass(box, data, callback);
      });

    }
  });

  builder
    .connect(processor);

  return [builder, processor];
}
