import { http, HttpResponse, delay } from 'msw'
import {
  mockRecipes, mockRecipeDetail, mockUsers, mockTags, mockIngredients,
  mockExperiments, mockStrategies, mockSystemConfig, generateTrendData,
} from './data'

// Helpers
const ok = (data: unknown, message = 'success') =>
  HttpResponse.json({ code: 200, message, data, success: true })

const page = (records: unknown[], total?: number, size = 10, current = 1) =>
  ok({ records, total: total ?? records.length, size, current, pages: Math.ceil((total ?? records.length) / size) })

const parseUrl = (url: URL) => {
  const params: Record<string, string> = {}
  url.searchParams.forEach((v, k) => { params[k] = v })
  return params
}

export const handlers = [
  // ─── Auth ────────────────────────────────────────────
  http.post('/api/auth/login', async ({ request }) => {
    await delay(300)
    const body = await request.json() as Record<string, string>
    if (body.username === 'admin' && body.password === 'admin123') {
      return ok({
        token: 'admin-mock-token-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        userId: 1,
        username: 'admin',
        nickname: '管理员',
        avatar: '',
        role: 'ADMIN',
      })
    }
    return HttpResponse.json({ code: 401, message: '用户名或密码错误', data: null, success: false }, { status: 401 })
  }),

  // ─── Dashboard ───────────────────────────────────────
  http.get('/api/admin/analytics/overview', async () => {
    await delay(150)
    return ok({
      totalRecipes: 156,
      totalUsers: 2340,
      totalComments: 8920,
      todayViews: 1250,
      todayLikes: 234,
      todayComments: 89,
      todayNewUsers: 15,
    })
  }),

  http.get('/api/admin/analytics/trend', async () => {
    await delay(200)
    return ok(generateTrendData())
  }),

  // ─── Recipes ─────────────────────────────────────────
  http.get('/api/recipes', async ({ request }) => {
    await delay(150)
    const url = new URL(request.url)
    const { keyword, status, current = '1', size = '10' } = parseUrl(url)
    let filtered = [...mockRecipes]
    if (keyword) filtered = filtered.filter(r => r.title.includes(keyword) || r.description.includes(keyword))
    if (status !== undefined && status !== '') filtered = filtered.filter(r => r.status === Number(status))
    const c = Number(current)
    const s = Number(size)
    const start = (c - 1) * s
    return page(filtered.slice(start, start + s), filtered.length, s, c)
  }),

  http.get('/api/recipes/:id', async ({ params }) => {
    await delay(100)
    return ok({ ...mockRecipeDetail, id: Number(params.id) })
  }),

  http.post('/api/recipes/full', async () => {
    await delay(400)
    return ok({ id: Date.now() }, '创建成功')
  }),

  http.put('/api/recipes/:id/full', async () => {
    await delay(400)
    return ok(null, '更新成功')
  }),

  http.delete('/api/recipes/:id', async () => {
    await delay(300)
    return ok(null, '删除成功')
  }),

  http.put('/api/recipes/:id/status', async () => {
    await delay(300)
    return ok(null, '状态更新成功')
  }),

  // ─── Users ───────────────────────────────────────────
  http.get('/api/admin/users', async ({ request }) => {
    await delay(150)
    const url = new URL(request.url)
    const { keyword, current = '1', size = '10' } = parseUrl(url)
    let filtered = [...mockUsers]
    if (keyword) filtered = filtered.filter(u => u.username.includes(keyword) || u.nickname.includes(keyword))
    const c = Number(current)
    const s = Number(size)
    const start = (c - 1) * s
    return page(filtered.slice(start, start + s), filtered.length, s, c)
  }),

  http.put('/api/admin/users/:id/role', async () => {
    await delay(300)
    return ok(null, '角色更新成功')
  }),

  // ─── Tags ────────────────────────────────────────────
  http.get('/tags', async ({ request }) => {
    await delay(150)
    const url = new URL(request.url)
    const { keyword, current = '1', size = '10' } = parseUrl(url)
    let filtered = [...mockTags]
    if (keyword) filtered = filtered.filter(t => t.name.includes(keyword))
    const c = Number(current)
    const s = Number(size)
    const start = (c - 1) * s
    return page(filtered.slice(start, start + s), filtered.length, s, c)
  }),

  http.post('/tags', async () => {
    await delay(400)
    return ok({ id: Date.now() }, '创建成功')
  }),

  http.put('/tags/:id', async () => {
    await delay(300)
    return ok(null, '更新成功')
  }),

  http.delete('/tags/:id', async () => {
    await delay(300)
    return ok(null, '删除成功')
  }),

  // ─── Ingredients ─────────────────────────────────────
  http.get('/ingredients', async ({ request }) => {
    await delay(150)
    const url = new URL(request.url)
    const { keyword, current = '1', size = '10' } = parseUrl(url)
    let filtered = [...mockIngredients]
    if (keyword) filtered = filtered.filter(i => i.name.includes(keyword))
    const c = Number(current)
    const s = Number(size)
    const start = (c - 1) * s
    return page(filtered.slice(start, start + s), filtered.length, s, c)
  }),

  http.post('/ingredients', async () => {
    await delay(400)
    return ok({ id: Date.now() }, '创建成功')
  }),

  http.put('/ingredients/:id', async () => {
    await delay(300)
    return ok(null, '更新成功')
  }),

  http.delete('/ingredients/:id', async () => {
    await delay(300)
    return ok(null, '删除成功')
  }),

  // ─── System Config ───────────────────────────────────
  http.get('/admin/system/config', async () => {
    await delay(200)
    return ok(mockSystemConfig)
  }),

  http.post('/admin/system/config', async () => {
    await delay(400)
    return ok(null, '保存成功')
  }),

  // ─── A/B Experiments ─────────────────────────────────
  http.get('/admin/ab/experiments', async () => {
    await delay(200)
    return ok(mockExperiments)
  }),

  http.post('/admin/ab/experiments', async () => {
    await delay(400)
    return ok({ id: Date.now() }, '创建成功')
  }),

  http.put('/admin/ab/experiments/:id', async () => {
    await delay(300)
    return ok(null, '更新成功')
  }),

  http.delete('/admin/ab/experiments/:id', async () => {
    await delay(300)
    return ok(null, '删除成功')
  }),

  // ─── Recommendation Strategies ───────────────────────
  http.get('/api/admin/recommendation/strategies', async () => {
    await delay(200)
    return ok(mockStrategies)
  }),

  http.post('/api/admin/recommendation/strategies', async () => {
    await delay(400)
    return ok({ id: Date.now() }, '创建成功')
  }),

  http.put('/api/admin/recommendation/strategies/:id', async () => {
    await delay(300)
    return ok(null, '更新成功')
  }),
]
