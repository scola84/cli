export function mysql (s, schema, name) {
  s.setQuery(
    s.query(
      s.select(
        s.as(
          'COLUMNS.TABLE_NAME',
          s.id('table')
        ),
        s.as(
          'COLUMNS.COLUMN_NAME',
          s.id('name')
        ),
        s.as(
          'COLUMNS.DATA_TYPE',
          s.id('type')
        ),
        s.as(
          s.eq(
            'COLUMNS.IS_NULLABLE',
            s.value('NO')
          ),
          s.id('required')
        ),
        s.as(
          'COLUMNS.CHARACTER_MAXIMUM_LENGTH',
          s.id('maxlength')
        ),
        s.as(
          'COLUMNS.COLUMN_COMMENT',
          s.id('options')
        ),
        s.as(
          s.eq(
            'COLUMNS.COLUMN_KEY',
            s.value('PRI')
          ),
          s.id('primary')
        ),
        s.as(
          s.replace(
            s.substring(
              'COLUMNS.COLUMN_TYPE',
              s.plus(
                s.locate(
                  s.value('('),
                  'COLUMNS.COLUMN_TYPE'
                ),
                1
              )
            ),
            s.value(')'),
            s.value('')
          ).parens(),
          s.id('values')
        )
      ),
      s.from('information_schema.COLUMNS'),
      s.where(
        s.and(
          s.eq(
            'COLUMNS.TABLE_SCHEMA',
            s.value(schema)
          ),
          s.like(
            'COLUMNS.TABLE_NAME',
            s.value(name)
          )
        )
      ),
      s.orderBy(
        s.asc(
          s.id('COLUMNS.TABLE_NAME')
        ),
        s.asc(
          s.id('COLUMNS.ORDINAL_POSITION')
        )
      )
    )
  )
}
