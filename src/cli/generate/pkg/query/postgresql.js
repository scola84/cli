export function postgresql (s, schema, name) {
  s.setQuery(
    s.query(
      s.select(
        s.as(
          'columns.table_name',
          s.id('table')
        ),
        s.as(
          'columns.column_name',
          s.id('name')
        ),
        s.as(
          'columns.udt_name',
          s.id('type')
        ),
        s.as(
          s.eq(
            'columns.is_nullable',
            s.value('NO')
          ),
          s.id('required')
        ),
        s.as(
          'columns.character_maximum_length',
          s.id('maxlength')
        ),
        s.as(
          s.query(
            s.select(
              'pg_catalog.col_description(pg_class.oid,columns.ordinal_position)'
            ),
            s.from('pg_catalog.pg_class'),
            s.where(
              s.eq(
                'relname',
                'columns.table_name'
              )
            )
          ).parens(),
          s.id('options')
        ),
        s.as(
          s.query(
            s.select(
              s.gt(
                s.count('*'),
                0
              )
            ),
            s.from('information_schema.key_column_usage'),
            s.where(
              s.and(
                s.like(
                  'key_column_usage.constraint_name',
                  s.value('%_pkey')
                ),
                s.eq(
                  'key_column_usage.table_name',
                  'columns.table_name'
                ),
                s.eq(
                  'key_column_usage.column_name',
                  'columns.column_name'
                )
              )
            )
          ).parens(),
          s.id('primary')
        ),
        s.as(
          s.query(
            s.select(
              s.stringAgg(
                'enumlabel',
                s.value(',')
              )
            ),
            s.from('pg_type'),
            s.join('pg_enum'),
            s.on(
              s.eq(
                'pg_enum.enumtypid',
                'pg_type.oid'
              )
            ),
            s.where(
              s.eq(
                'pg_type.typname',
                'information_schema.columns.udt_name'
              )
            )
          ).parens(),
          s.id('values')
        )
      ),
      s.from('information_schema.columns'),
      s.where(
        s.and(
          s.eq(
            'columns.table_catalog',
            s.value(schema)
          ),
          s.eq(
            'columns.table_schema',
            s.value('public')
          ),
          s.like(
            'columns.table_name',
            s.value(name)
          )
        )
      ),
      s.orderBy(
        s.asc(
          s.id('columns.table_name')
        ),
        s.asc(
          s.id('columns.ordinal_position')
        )
      )
    )
  )
}
