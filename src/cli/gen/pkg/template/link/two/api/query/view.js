import { SqlBuilder } from '@scola/doc'

export function buildView () {
  const s = new SqlBuilder({
    type: 'object'
  })

  s.build(
    s.query(
      s.select('*'),
      s.from(
        s.id('/*table*/')
      ),
      s.left(),
      s.join(
        s.id('/*link*/')
      ),
      s.on(
        s.eq(
          s.id('/*table*/./*link*/_id'),
          s.id('/*link*/./*link*/_id')
        )
      ),
      s.where(
        s.and(
          s.eq(
            s.id('/*table*/./*object*/_id'),
            s.value((request) => {
              return request.params['/*object*/_id']
            })
          ),
          s.eq(
            s.id('/*table*/./*link*/_id'),
            s.value((request) => {
              return request.params['/*link*/_id']
            })
          )
        )
      )
    )
  )

  return s
}
