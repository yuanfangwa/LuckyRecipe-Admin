// ============================================================
// Mock Data — LuckyRecipe Admin
// ============================================================

export const mockRecipes = [
  { id: 1, title: '红烧肉', categoryId: 1, categoryName: '家常菜', cover: 'https://picsum.photos/seed/hongshaorou/400/300', description: '经典红烧肉，肥而不腻，入口即化', difficulty: 2, cookTime: 90, servings: 4, status: 1, viewCount: 3280, likeCount: 456, commentCount: 89, createdAt: '2025-12-01 10:00:00', updatedAt: '2026-03-15 14:30:00', author: '美食达人' },
  { id: 2, title: '宫保鸡丁', categoryId: 2, categoryName: '川菜', cover: 'https://picsum.photos/seed/gongbaojiding/400/300', description: '麻辣鲜香，花生酥脆，下饭神器', difficulty: 1, cookTime: 25, servings: 3, status: 1, viewCount: 5620, likeCount: 892, commentCount: 156, createdAt: '2025-11-20 08:30:00', updatedAt: '2026-03-10 11:00:00', author: '川菜大师' },
  { id: 3, title: '番茄炒蛋', categoryId: 1, categoryName: '家常菜', cover: 'https://picsum.photos/seed/fanqiechaodan/400/300', description: '简单快手菜，酸甜可口，老少皆宜', difficulty: 1, cookTime: 15, servings: 2, status: 1, viewCount: 8930, likeCount: 1245, commentCount: 234, createdAt: '2025-10-05 12:00:00', updatedAt: '2026-03-01 09:00:00', author: '厨房小白' },
  { id: 4, title: '麻婆豆腐', categoryId: 2, categoryName: '川菜', cover: 'https://picsum.photos/seed/mapodoufu/400/300', description: '麻辣烫酥嫩，豆腐嫩滑入味', difficulty: 1, cookTime: 20, servings: 3, status: 1, viewCount: 4120, likeCount: 678, commentCount: 112, createdAt: '2025-11-15 15:00:00', updatedAt: '2026-02-28 16:00:00', author: '川菜大师' },
  { id: 5, title: '糖醋排骨', categoryId: 1, categoryName: '家常菜', cover: 'https://picsum.photos/seed/tangcupaigu/400/300', description: '外酥里嫩，酸甜适口，宴客必备', difficulty: 2, cookTime: 45, servings: 4, status: 1, viewCount: 6780, likeCount: 1023, commentCount: 198, createdAt: '2025-09-20 11:00:00', updatedAt: '2026-03-12 10:30:00', author: '美食达人' },
  { id: 6, title: '清蒸鲈鱼', categoryId: 3, categoryName: '粤菜', cover: 'https://picsum.photos/seed/zhengluyu/400/300', description: '鲜嫩爽滑，原汁原味，营养丰富', difficulty: 2, cookTime: 30, servings: 3, status: 1, viewCount: 3450, likeCount: 567, commentCount: 87, createdAt: '2025-12-10 09:00:00', updatedAt: '2026-03-08 14:00:00', author: '粤菜师傅' },
  { id: 7, title: '水煮鱼', categoryId: 2, categoryName: '川菜', cover: 'https://picsum.photos/seed/shuizhuyu/400/300', description: '鱼肉鲜嫩，麻辣过瘾，经典川菜', difficulty: 3, cookTime: 40, servings: 4, status: 1, viewCount: 7890, likeCount: 1456, commentCount: 267, createdAt: '2025-08-15 13:00:00', updatedAt: '2026-03-14 08:30:00', author: '川菜大师' },
  { id: 8, title: '蛋炒饭', categoryId: 1, categoryName: '家常菜', cover: 'https://picsum.photos/seed/chaofan/400/300', description: '粒粒分明，金黄诱人，快手主食', difficulty: 1, cookTime: 10, servings: 1, status: 1, viewCount: 12340, likeCount: 2034, commentCount: 345, createdAt: '2025-07-01 07:00:00', updatedAt: '2026-03-13 12:00:00', author: '厨房小白' },
  { id: 9, title: '东坡肉', categoryId: 4, categoryName: '浙菜', cover: 'https://picsum.photos/seed/dongporou/400/300', description: '酒香浓郁，酥烂入味，杭州名菜', difficulty: 3, cookTime: 120, servings: 6, status: 1, viewCount: 4560, likeCount: 789, commentCount: 134, createdAt: '2025-10-20 14:00:00', updatedAt: '2026-02-25 10:00:00', author: '浙菜传承' },
  { id: 10, title: '酸辣土豆丝', categoryId: 1, categoryName: '家常菜', cover: 'https://picsum.photos/seed/tudousi/400/300', description: '酸辣爽脆，开胃下饭，百吃不厌', difficulty: 1, cookTime: 15, servings: 2, status: 1, viewCount: 9870, likeCount: 1678, commentCount: 289, createdAt: '2025-06-10 16:00:00', updatedAt: '2026-03-11 15:00:00', author: '美食达人' },
  { id: 11, title: '回锅肉', categoryId: 2, categoryName: '川菜', cover: 'https://picsum.photos/seed/huiguorou/400/300', description: '肥而不腻，蒜苗飘香，川菜之首', difficulty: 2, cookTime: 35, servings: 3, status: 1, viewCount: 5430, likeCount: 890, commentCount: 156, createdAt: '2025-09-01 10:00:00', updatedAt: '2026-03-09 11:30:00', author: '川菜大师' },
  { id: 12, title: '白切鸡', categoryId: 3, categoryName: '粤菜', cover: 'https://picsum.photos/seed/baiqieji/400/300', description: '皮爽肉滑，蘸料提味，粤菜经典', difficulty: 2, cookTime: 50, servings: 4, status: 1, viewCount: 3890, likeCount: 623, commentCount: 98, createdAt: '2025-11-05 12:00:00', updatedAt: '2026-02-20 09:00:00', author: '粤菜师傅' },
  { id: 13, title: '小炒黄牛肉', categoryId: 5, categoryName: '湘菜', cover: 'https://picsum.photos/seed/huangniurou/400/300', description: '牛肉嫩滑，辣椒爆香，湖南味道', difficulty: 2, cookTime: 20, servings: 3, status: 0, viewCount: 2340, likeCount: 345, commentCount: 56, createdAt: '2026-01-10 11:00:00', updatedAt: '2026-03-05 14:00:00', author: '湘菜爱好者' },
  { id: 14, title: '蒜蓉西兰花', categoryId: 6, categoryName: '素菜', cover: 'https://picsum.photos/seed/xilanhua/400/300', description: '翠绿爽口，蒜香浓郁，健康美味', difficulty: 1, cookTime: 10, servings: 2, status: 0, viewCount: 1890, likeCount: 234, commentCount: 34, createdAt: '2026-01-20 08:00:00', updatedAt: '2026-02-15 10:00:00', author: '素食达人' },
  { id: 15, title: '可乐鸡翅', categoryId: 1, categoryName: '家常菜', cover: 'https://picsum.photos/seed/kelechichi/400/300', description: '色泽诱人，甜香入味，孩子最爱', difficulty: 1, cookTime: 30, servings: 3, status: 1, viewCount: 11230, likeCount: 1890, commentCount: 312, createdAt: '2025-05-15 17:00:00', updatedAt: '2026-03-16 09:00:00', author: '美食达人' },
  { id: 16, title: '剁椒鱼头', categoryId: 5, categoryName: '湘菜', cover: 'https://picsum.photos/seed/duojiaoyutou/400/300', description: '鱼头鲜嫩，剁椒香辣，湖南招牌菜', difficulty: 3, cookTime: 45, servings: 4, status: 1, viewCount: 6120, likeCount: 978, commentCount: 178, createdAt: '2025-10-10 13:00:00', updatedAt: '2026-03-07 16:30:00', author: '湘菜爱好者' },
]

export const mockRecipeDetail = {
  ...mockRecipes[0],
  ingredients: [
    { name: '五花肉', amount: '500g' },
    { name: '冰糖', amount: '30g' },
    { name: '生抽', amount: '2勺' },
    { name: '老抽', amount: '1勺' },
    { name: '料酒', amount: '2勺' },
    { name: '葱姜', amount: '适量' },
    { name: '八角', amount: '2个' },
    { name: '桂皮', amount: '1小块' },
  ],
  steps: [
    { order: 1, content: '五花肉切成3cm见方的块，冷水下锅焯水去血沫，捞出洗净备用', image: '' },
    { order: 2, content: '锅中放少许油，小火放入冰糖，炒至枣红色起大泡', image: '' },
    { order: 3, content: '放入焯好的五花肉，翻炒均匀上色', image: '' },
    { order: 4, content: '加入葱段、姜片、八角、桂皮翻炒出香味', image: '' },
    { order: 5, content: '烹入料酒，加入生抽、老抽，倒入开水没过肉面', image: '' },
    { order: 6, content: '大火烧开后转小火，盖盖焖煮60分钟至肉酥烂', image: '' },
    { order: 7, content: '最后大火收汁，汤汁浓稠即可出锅', image: '' },
  ],
  tags: ['家常菜', '下饭菜', '肉类', '红烧'],
  nutrition: { calories: 450, protein: 25, fat: 35, carbs: 12 },
}

export const mockUsers = [
  { id: 1, username: 'admin', nickname: '管理员', avatar: '', email: 'admin@luckyrecipe.com', phone: '13800000001', role: 'ADMIN', status: 1, createdAt: '2025-01-01 00:00:00', lastLoginTime: '2026-04-02 08:00:00', recipeCount: 0 },
  { id: 2, username: 'chef_zhang', nickname: '张大厨', avatar: '', email: 'zhang@luckyrecipe.com', phone: '13800000002', role: 'USER', status: 1, createdAt: '2025-02-15 10:00:00', lastLoginTime: '2026-04-01 20:00:00', recipeCount: 28 },
  { id: 3, username: 'foodie_li', nickname: '美食家小李', avatar: '', email: 'li@luckyrecipe.com', phone: '13800000003', role: 'USER', status: 1, createdAt: '2025-03-20 14:00:00', lastLoginTime: '2026-04-02 07:30:00', recipeCount: 15 },
  { id: 4, username: 'cook_wang', nickname: '厨神老王', avatar: '', email: 'wang@luckyrecipe.com', phone: '13800000004', role: 'USER', status: 1, createdAt: '2025-04-10 09:00:00', lastLoginTime: '2026-03-30 18:00:00', recipeCount: 42 },
  { id: 5, username: 'veggie_chen', nickname: '素食小陈', avatar: '', email: 'chen@luckyrecipe.com', phone: '13800000005', role: 'USER', status: 1, createdAt: '2025-05-05 11:00:00', lastLoginTime: '2026-04-01 12:00:00', recipeCount: 19 },
  { id: 6, username: 'baker_liu', nickname: '烘焙达人刘', avatar: '', email: 'liu@luckyrecipe.com', phone: '13800000006', role: 'USER', status: 1, createdAt: '2025-06-01 16:00:00', lastLoginTime: '2026-03-29 09:00:00', recipeCount: 33 },
  { id: 7, username: 'spicy_zhao', nickname: '辣妹子小赵', avatar: '', email: 'zhao@luckyrecipe.com', phone: '13800000007', role: 'USER', status: 1, createdAt: '2025-06-20 08:00:00', lastLoginTime: '2026-04-02 06:00:00', recipeCount: 22 },
  { id: 8, username: 'health_sun', nickname: '养生孙', avatar: '', email: 'sun@luckyrecipe.com', phone: '13800000008', role: 'USER', status: 0, createdAt: '2025-07-15 13:00:00', lastLoginTime: '2026-02-15 10:00:00', recipeCount: 8 },
  { id: 9, username: 'novice_wu', nickname: '新手小吴', avatar: '', email: 'wu@luckyrecipe.com', phone: '13800000009', role: 'USER', status: 1, createdAt: '2025-08-10 10:00:00', lastLoginTime: '2026-04-01 22:00:00', recipeCount: 3 },
  { id: 10, username: 'seafood_zhou', nickname: '海鲜周', avatar: '', email: 'zhou@luckyrecipe.com', phone: '13800000010', role: 'USER', status: 1, createdAt: '2025-09-01 15:00:00', lastLoginTime: '2026-03-28 14:00:00', recipeCount: 17 },
  { id: 11, username: 'noodle_feng', nickname: '面食冯', avatar: '', email: 'feng@luckyrecipe.com', phone: '13800000011', role: 'USER', status: 1, createdAt: '2025-10-05 09:00:00', lastLoginTime: '2026-04-01 16:00:00', recipeCount: 25 },
  { id: 12, username: 'dimsum_huang', nickname: '点心黄', avatar: '', email: 'huang@luckyrecipe.com', phone: '13800000012', role: 'USER', status: 0, createdAt: '2025-11-10 14:00:00', lastLoginTime: '2026-01-20 08:00:00', recipeCount: 11 },
]

export const mockTags = [
  { id: 1, name: '家常菜', recipeCount: 45, status: 1, createdAt: '2025-01-01 00:00:00' },
  { id: 2, name: '川菜', recipeCount: 32, status: 1, createdAt: '2025-01-01 00:00:00' },
  { id: 3, name: '粤菜', recipeCount: 28, status: 1, createdAt: '2025-01-01 00:00:00' },
  { id: 4, name: '浙菜', recipeCount: 15, status: 1, createdAt: '2025-01-05 10:00:00' },
  { id: 5, name: '湘菜', recipeCount: 18, status: 1, createdAt: '2025-01-10 08:00:00' },
  { id: 6, name: '素菜', recipeCount: 22, status: 1, createdAt: '2025-02-01 12:00:00' },
  { id: 7, name: '下饭菜', recipeCount: 56, status: 1, createdAt: '2025-02-10 14:00:00' },
  { id: 8, name: '快手菜', recipeCount: 38, status: 1, createdAt: '2025-03-01 09:00:00' },
  { id: 9, name: '肉类', recipeCount: 42, status: 1, createdAt: '2025-03-15 10:00:00' },
  { id: 10, name: '海鲜', recipeCount: 20, status: 1, createdAt: '2025-04-01 11:00:00' },
  { id: 11, name: '汤羹', recipeCount: 16, status: 1, createdAt: '2025-04-15 15:00:00' },
  { id: 12, name: '甜品', recipeCount: 25, status: 1, createdAt: '2025-05-01 08:00:00' },
  { id: 13, name: '烘焙', recipeCount: 19, status: 1, createdAt: '2025-05-20 13:00:00' },
  { id: 14, name: '减脂餐', recipeCount: 14, status: 1, createdAt: '2025-06-10 09:00:00' },
  { id: 15, name: '早餐', recipeCount: 30, status: 1, createdAt: '2025-06-25 07:00:00' },
  { id: 16, name: '宵夜', recipeCount: 12, status: 1, createdAt: '2025-07-01 18:00:00' },
  { id: 17, name: '红烧', recipeCount: 21, status: 1, createdAt: '2025-07-15 10:00:00' },
  { id: 18, name: '凉拌', recipeCount: 18, status: 1, createdAt: '2025-08-01 14:00:00' },
]

export const mockIngredients = [
  { id: 1, name: '五花肉', category: '肉类', unit: '克', status: 1, createdAt: '2025-01-01 00:00:00' },
  { id: 2, name: '鸡胸肉', category: '肉类', unit: '克', status: 1, createdAt: '2025-01-01 00:00:00' },
  { id: 3, name: '鸡蛋', category: '蛋类', unit: '个', status: 1, createdAt: '2025-01-01 00:00:00' },
  { id: 4, name: '土豆', category: '蔬菜', unit: '个', status: 1, createdAt: '2025-01-05 10:00:00' },
  { id: 5, name: '番茄', category: '蔬菜', unit: '个', status: 1, createdAt: '2025-01-05 10:00:00' },
  { id: 6, name: '青椒', category: '蔬菜', unit: '个', status: 1, createdAt: '2025-01-10 08:00:00' },
  { id: 7, name: '豆腐', category: '豆制品', unit: '块', status: 1, createdAt: '2025-02-01 12:00:00' },
  { id: 8, name: '鲈鱼', category: '海鲜', unit: '条', status: 1, createdAt: '2025-02-10 14:00:00' },
  { id: 9, name: '排骨', category: '肉类', unit: '克', status: 1, createdAt: '2025-03-01 09:00:00' },
  { id: 10, name: '牛肉', category: '肉类', unit: '克', status: 1, createdAt: '2025-03-15 10:00:00' },
  { id: 11, name: '西兰花', category: '蔬菜', unit: '克', status: 1, createdAt: '2025-04-01 11:00:00' },
  { id: 12, name: '鸡翅', category: '肉类', unit: '个', status: 1, createdAt: '2025-04-15 15:00:00' },
  { id: 13, name: '葱姜蒜', category: '调味料', unit: '适量', status: 1, createdAt: '2025-05-01 08:00:00' },
  { id: 14, name: '生抽', category: '调味料', unit: '勺', status: 1, createdAt: '2025-05-20 13:00:00' },
  { id: 15, name: '老抽', category: '调味料', unit: '勺', status: 1, createdAt: '2025-06-10 09:00:00' },
  { id: 16, name: '料酒', category: '调味料', unit: '勺', status: 1, createdAt: '2025-06-25 07:00:00' },
  { id: 17, name: '冰糖', category: '调味料', unit: '克', status: 1, createdAt: '2025-07-01 18:00:00' },
  { id: 18, name: '八角', category: '调味料', unit: '个', status: 1, createdAt: '2025-07-15 10:00:00' },
]

export const mockExperiments = [
  { id: 1, name: '首页推荐算法A/B测试', description: '对比协同过滤与内容推荐算法在首页的点击率', status: 'RUNNING', startDate: '2026-03-01', endDate: '2026-04-01', trafficPercent: 50, metrics: { clickRate: 0.23, conversionRate: 0.08, avgStayTime: 45 }, createdAt: '2026-02-25 10:00:00' },
  { id: 2, name: '搜索排序优化', description: '测试新的搜索排序权重对用户搜索满意度的影响', status: 'RUNNING', startDate: '2026-03-10', endDate: '2026-04-10', trafficPercent: 30, metrics: { clickRate: 0.31, conversionRate: 0.12, avgStayTime: 52 }, createdAt: '2026-03-05 09:00:00' },
  { id: 3, name: '菜谱详情页改版', description: '新版详情页增加营养信息展示和食材链接', status: 'COMPLETED', startDate: '2026-02-01', endDate: '2026-03-01', trafficPercent: 20, metrics: { clickRate: 0.18, conversionRate: 0.15, avgStayTime: 68 }, createdAt: '2026-01-28 14:00:00' },
  { id: 4, name: '个性化标签推荐', description: '基于用户历史行为推荐标签和分类', status: 'DRAFT', startDate: '2026-04-15', endDate: '2026-05-15', trafficPercent: 10, metrics: { clickRate: 0, conversionRate: 0, avgStayTime: 0 }, createdAt: '2026-03-20 11:00:00' },
  { id: 5, name: '评论排序实验', description: '测试按时间/点赞数/相关度排序对评论互动的影响', status: 'PAUSED', startDate: '2026-02-15', endDate: '2026-03-15', trafficPercent: 25, metrics: { clickRate: 0.12, conversionRate: 0.05, avgStayTime: 30 }, createdAt: '2026-02-10 16:00:00' },
  { id: 6, name: '视频菜谱入口', description: '在菜谱列表中增加短视频预览入口', status: 'DRAFT', startDate: '2026-05-01', endDate: '2026-06-01', trafficPercent: 15, metrics: { clickRate: 0, conversionRate: 0, avgStayTime: 0 }, createdAt: '2026-03-25 09:00:00' },
]

export const mockStrategies = [
  { id: 1, name: '热门推荐', type: 'POPULAR', description: '基于浏览量和点赞数的热门菜谱推荐', weight: 40, status: 1, createdAt: '2025-06-01 10:00:00', updatedAt: '2026-03-01 14:00:00' },
  { id: 2, name: '个性化推荐', type: 'PERSONALIZED', description: '基于用户历史行为和偏好的协同过滤推荐', weight: 30, status: 1, createdAt: '2025-07-15 09:00:00', updatedAt: '2026-03-10 11:00:00' },
  { id: 3, name: '新品推荐', type: 'NEW', description: '最近发布的高质量菜谱优先展示', weight: 15, status: 1, createdAt: '2025-08-20 14:00:00', updatedAt: '2026-03-05 16:00:00' },
  { id: 4, name: '相似推荐', type: 'SIMILAR', description: '基于当前浏览菜谱的相似度推荐', weight: 10, status: 1, createdAt: '2025-09-10 11:00:00', updatedAt: '2026-02-28 10:00:00' },
  { id: 5, name: '季节推荐', type: 'SEASONAL', description: '根据当前季节推荐应季食材菜谱', weight: 5, status: 1, createdAt: '2025-10-01 08:00:00', updatedAt: '2026-03-15 09:00:00' },
]

export const mockSystemConfig = [
  { key: 'site_name', label: '站点名称', value: 'LuckyRecipe 幸运菜谱', type: 'text', description: '网站标题和名称' },
  { key: 'site_description', label: '站点描述', value: '发现美食灵感，分享烹饪乐趣', type: 'text', description: '网站SEO描述' },
  { key: 'default_page_size', label: '默认分页大小', value: '12', type: 'number', description: '列表页默认每页显示条数' },
  { key: 'max_upload_size', label: '最大上传大小', value: '10', type: 'number', description: '图片/文件最大上传大小(MB)' },
  { key: 'enable_comment', label: '开启评论', value: 'true', type: 'boolean', description: '是否允许用户评论' },
  { key: 'enable_register', label: '开放注册', value: 'true', type: 'boolean', description: '是否开放新用户注册' },
  { key: 'recommend_count', label: '推荐数量', value: '6', type: 'number', description: '首页推荐菜谱数量' },
  { key: 'hot_recipe_threshold', label: '热门阈值', value: '1000', type: 'number', description: '菜谱被标记为热门的最低浏览量' },
]

// Generate trend data for the last 7 days
export function generateTrendData() {
  const data = []
  const now = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().slice(0, 10)
    data.push({
      date: dateStr,
      views: Math.floor(Math.random() * 800 + 800),
      likes: Math.floor(Math.random() * 200 + 100),
      comments: Math.floor(Math.random() * 100 + 50),
      newUsers: Math.floor(Math.random() * 50 + 20),
    })
  }
  return data
}
