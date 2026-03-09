export type CategoryId = 'main-meal' | 'cafe-tea' | 'jeju-seafood' | 'dessert-exp';

export type SelectionState = 'selected' | 'both' | 'dimmed' | 'none';

export interface QuestionCategory {
  id: CategoryId;
  label: string;
  emoji: string;
}

export interface QuestionOption {
  id: string;
  name: string;
  zh: string;
  price: string;
  area: string;
  tags: string[];
  desc: string;
  address: string;
  apple: string;
}

export interface Question {
  id: string;
  category: CategoryId;
  title: string;
  options: [QuestionOption, QuestionOption];
}

export const CATEGORIES: QuestionCategory[] = [
  { id: 'main-meal', label: '正餐', emoji: '🍖' },
  { id: 'jeju-seafood', label: '济州海味', emoji: '🐚' },
  { id: 'cafe-tea', label: '咖啡&下午茶', emoji: '☕' },
  { id: 'dessert-exp', label: '甜品&体验', emoji: '🍊' },
];

export function getQuestionsByCategory(categoryId: CategoryId): Question[] {
  return QUESTIONS.filter(q => q.category === categoryId);
}

export const QUESTIONS: Question[] = [
  // ===== 🍖 正餐 =====
  {
    id: 'q1', category: 'main-meal',
    title: '猪肉面对决：清汤利落 vs 浓汤老派？',
    options: [
      { id: 'olle', name: 'Olle Guksu', zh: '济州猪肉面', price: '¥60 / 人', area: '新济州',
        tags: ['落地轻松', '清汤派', '经典本地'],
        desc: '济州经典猪肉面馆，清汤利落，节奏快，适合落地后的第一餐，不会一上来就把胃轰炸太满。',
        address: '24 Gwiarang-gil, Jeju-si', apple: 'https://www.google.com/maps/search/올래국수+제주시+귀아랑길+24' },
      { id: 'samdae', name: 'Samdae Guksu Heogwan', zh: '老牌猪肉面馆', price: '¥70 / 人', area: '新济州',
        tags: ['老资格', '汤更浓', '面馆对决'],
        desc: '济州高知名度猪肉面馆，氛围更老资格，汤底更浓郁，是会引发队友分裂投票的对位选手。',
        address: '32 Sin-daero 20-gil, Jeju-si', apple: 'https://www.google.com/maps/search/삼대국수회관+제주' }
    ]
  },
  {
    id: 'q2', category: 'main-meal',
    title: '唯一一顿黑猪肉，投给谁？',
    options: [
      { id: 'sukseongdo', name: 'Sukseongdo', zh: '熟成黑猪肉', price: '¥220 / 人', area: '新济州',
        tags: ['熟成系', '店员代烤', '体验完整'],
        desc: '把这趟必须吃的一顿黑猪肉集中在这里解决。熟成、代烤、体验完整，适合作为济州黑猪肉的唯一代表。',
        address: '41 Wonnohyeong-ro, Jeju-si', apple: 'https://www.google.com/maps/search/숙성도+제주+원노형로' },
      { id: 'donsadon', name: 'Donsadon', zh: '传统黑猪肉名店', price: '¥200 / 人', area: '新济州',
        tags: ['传统派', '炭火感', '老资格'],
        desc: '如果队友执着于"更经典、更传统"的黑猪肉店，这一票大概率会投给它。炭火感更强，氛围更老派。',
        address: '19 Upyeong-ro, Jeju-si', apple: 'https://www.google.com/maps/search/돈사돈+제주+우평로' }
    ]
  },
  {
    id: 'q3', category: 'main-meal',
    title: '海鲜正餐：稳准狠团体局 vs 海女文化体验？',
    options: [
      { id: 'gozip', name: 'Gozip Dol Wooluck', zh: '海鲜正餐', price: '¥250–350 / 人', area: 'Hamdok',
        tags: ['多人稳选', '海鲜主战场', '好评稳定'],
        desc: '更适合"6 个人都想吃爽一点"的团体局。稳定、鲜味足、相对不容易翻车，是高票候选。',
        address: '2F, 491-9 Sinbuk-ro, Jocheon-eup, Jeju-si', apple: 'https://www.google.com/maps/search/고집돌우럭+함덕+제주' },
      { id: 'haenyeo', name: "Haenyeo's Kitchen", zh: '海女文化体验餐', price: '₩69,000–89,000 / 人', area: 'Bukchon',
        tags: ['文化体验', '故事性强', '济州限定'],
        desc: '不只是吃饱，而是把海女文化、演出感和济州记忆一起打包。适合想要一个独特记忆坐标的团队。',
        address: '31 Bukchon 9-gil, Jocheon-eup, Jeju-si', apple: 'https://www.google.com/maps/search/해녀의부엌+북촌+제주' }
    ]
  },
  {
    id: 'q4', category: 'main-meal',
    title: '高级晚餐：自助百汇 vs 正式韩式烤肉？',
    options: [
      { id: 'grandkitchen', name: 'Grand Kitchen', zh: 'Grand Hyatt 高配自助', price: '高预算', area: 'Dream Tower',
        tags: ['多人最稳', '选择超多', '意见分裂时首选'],
        desc: '非常适合 6 人团队。有人吃海鲜，有人吃肉，有人冲甜点，意见分裂时它就是最稳的解决方案。',
        address: '12 Noyeon-ro, Jeju-si', apple: 'https://www.google.com/maps/search/그랜드키친+그랜드하얏트+제주' },
      { id: 'noknamu', name: 'Noknamu', zh: '高级韩式烤肉', price: '高预算', area: 'Dream Tower',
        tags: ['正式晚宴', '酒店系', '更聚焦'],
        desc: '如果大家想把晚餐做成更正式的"认真吃一顿"，Noknamu 会更像收束得漂亮的一餐。',
        address: '12 Noyeon-ro, Jeju-si', apple: 'https://www.google.com/maps/search/녹나무+제주드림타워' }
    ]
  },
  // ===== ☕ 咖啡&下午茶 =====
  {
    id: 'q5', category: 'cafe-tea',
    title: '早午餐：现象级贝果 vs 英式烘焙？',
    options: [
      { id: 'londonbagel', name: 'London Bagel Museum', zh: '现象级贝果店', price: '¥60–110 / 人', area: '东线 Gujwa',
        tags: ['现象级', '面包目的地', '早午餐必打'],
        desc: '更像"为了早餐专门去一趟"的目的地型店。团队里有重度面包脑袋，这一票会很好赢。',
        address: '85 Dongbok-ro, Gujwa-eup, Jeju-si', apple: 'https://www.google.com/maps/search/런던베이글뮤지엄+제주' },
      { id: 'layered', name: 'Cafe Layered Jeju', zh: '英式甜点烘焙', price: '¥60–100 / 人', area: '东线 Gujwa',
        tags: ['司康派', '英式氛围', '甜点友好'],
        desc: '与 London Bagel Museum 同片区，风格更偏英式烘焙与下午茶审美，适合不那么迷恋贝果的人。',
        address: '85 Dongbok-ro, Gujwa-eup, Jeju-si', apple: 'https://www.google.com/maps/search/카페레이어드+제주' }
    ]
  },
  {
    id: 'q6', category: 'cafe-tea',
    title: '下午茶：海边咖啡馆 vs 东门市场小吃？',
    options: [
      { id: 'antoinette', name: 'Antoinette', zh: '海边烘焙咖啡馆', price: '¥50–80 / 人', area: '机场海边线',
        tags: ['海边烘焙', '轻盈甜点', '度假感'],
        desc: '海边、面包、咖啡，一下子就有"已经开始度假"的感觉。适合把下午过得松弛一点。',
        address: '671 Seohaean-ro, Jeju-si', apple: 'https://www.google.com/maps/search/앙투아네뜨+제주+서해안로' },
      { id: 'dongmun', name: 'Dongmun Market', zh: '东门市场小吃巡游', price: '自由点单', area: '老城区',
        tags: ['边走边吃', '高自由度', '旅行气氛'],
        desc: '6 人团队模式的最佳选项：谁想吃海鲜煎饼、谁想吃橘子甜点，直接现场分流，不用统一意见。',
        address: '20 Gwandeok-ro 14-gil, Jeju-si', apple: 'https://www.google.com/maps/search/동문시장+제주' }
    ]
  },
  {
    id: 'q7', category: 'cafe-tea',
    title: '海边咖啡：经典大窗海景 vs 可爱小屋风？',
    options: [
      { id: 'delmoondo', name: 'Cafe Delmoondo', zh: '经典海景咖啡', price: '¥45–80 / 人', area: 'Hamdok',
        tags: ['经典海景', '大玻璃窗', '看海发呆'],
        desc: '更经典、完成度更高，也更像第一次来济州时脑中会浮现的"海景咖啡馆标准答案"。',
        address: '519-10 Johamhaean-ro, Jocheon-eup, Jeju-si', apple: 'https://www.google.com/maps/search/카페델문도+함덕+제주' },
      { id: 'bomnal', name: 'Bomnal Cafe', zh: '爱月海边小屋咖啡', price: '¥45–80 / 人', area: 'Aewol',
        tags: ['更可爱', '小屋感', '柑橘饮料'],
        desc: '如果团队偏爱更轻巧、更"海边小房子"的气质，这张票常常比 Delmoondo 更讨喜。',
        address: '25 Aewol-ro 1-gil, Aewol-eup, Jeju-si', apple: 'https://www.google.com/maps/search/봄날카페+애월+제주' }
    ]
  },
  // ===== 🐚 济州海味 =====
  {
    id: 'q8', category: 'jeju-seafood',
    title: '济州早餐：鲍鱼粥 vs 玉鲷烤鱼？',
    options: [
      { id: 'myeongjin', name: 'Myeongjin Jeonbok', zh: '鲍鱼粥专门店', price: '₩13,000–30,000 / 人', area: '旧左邑 · 东线',
        tags: ['鲍鱼早餐', '海边绝景', '东线必吃'],
        desc: '济州岛东部最有名的鲍鱼料理专门店。鲍鱼粥浓郁鲜甜，石锅饭拌入鲍鱼内脏香气独特，窗外就是大海。排队也值得的晨间朝圣地。',
        address: '제주시 구좌읍 해맞이해안로 1282', apple: 'https://www.google.com/maps/search/명진전복+제주+구좌읍' },
      { id: 'okdomyeok', name: 'Okdom Station', zh: '玉鲷烤鱼定食', price: '₩15,000–25,000 / 人', area: '南元 · 南线',
        tags: ['济州灵魂鱼', '玉鲷定食', '淡雅清鲜'],
        desc: '济州唯一的玉鲷专门餐厅。玉鲷被称为"鲷鱼女王"，曾是朝鲜时代贡品，烤出来清香四溢、肉质细嫩，是最具济州特色的传统味道。',
        address: '제주 서귀포시 남원읍 태위로 522', apple: 'https://www.google.com/maps/search/옥돔식당+서귀포+남원' }
    ]
  },
  {
    id: 'q9', category: 'jeju-seafood',
    title: '带鱼锅对决：辣炖大锅 vs 匠人拌饭？',
    options: [
      { id: 'gwanghae', name: 'Jejugwanghae', zh: '辣炖白带鱼锅', price: '₩20,000–30,000 / 人', area: '涯月 · 西线',
        tags: ['现捞带鱼', '甜辣锅', '超级下饭'],
        desc: '使用当日现捞白带鱼，先煎再炖，甜辣汤底吸满年糕和蔬菜。带鱼肉质鲜嫩厚实，还有各种生腌海鲜可以加点，是带鱼料理的高分代表。',
        address: '제주시 애월읍 애월로 33', apple: 'https://www.google.com/maps/search/제주광해+애월' },
      { id: 'galchijang', name: 'Galchi Jangin', zh: '带鱼料理匠人', price: '₩15,000–25,000 / 人', area: '新济州',
        tags: ['日韩风格', '带鱼拌饭', '氛围感'],
        desc: '日韩结合装修风格，氛围感拉满。带鱼拌饭是隐藏招牌，有会中文的店员，位于免税店附近，适合购物后就近解决一餐的好选择。',
        address: '제주시 연동 신라면세점 부근', apple: 'https://www.google.com/maps/search/갈치장인+제주+연동' }
    ]
  },
  {
    id: 'q10', category: 'jeju-seafood',
    title: '济州汤品：厚重猪骨汤 vs 传统荞麦汤？',
    options: [
      { id: 'woojin', name: 'Woojin Haejangguk', zh: '猪骨解酒汤', price: '₩8,000–12,000 / 人', area: '济州市',
        tags: ['解酒神器', '猪骨浓汤', '本地人最爱'],
        desc: '济州本地人最爱的解酒汤名店，猪骨汤底浓郁醇厚，配上泡菜和米饭就是完美的清晨续命套餐。价格亲民，24小时营业，喝完酒第二天来最合适。',
        address: '제주시 서사로 11', apple: 'https://www.google.com/maps/search/우진해장국+제주' },
      { id: 'sunine', name: "Suni's Momguk", zh: '济州몸국 · 荞麦猪肉汤', price: '₩9,000–12,000 / 人', area: '旧济州',
        tags: ['济州限定', '荞麦汤底', '乡土味道'],
        desc: '몸국是济州独有的乡土料理，用荞麦粉和猪肉熬制。口感朴素温润，是济州人婚丧嫁娶必备的"灵魂汤"，在别的地方吃不到的济州限定体验。',
        address: '제주시 삼도2동 1168-1', apple: 'https://www.google.com/maps/search/순이네몸국+제주' }
    ]
  },
  {
    id: 'q11', category: 'jeju-seafood',
    title: '酱蟹 vs 海鲜锅：精致生腌 vs 豪放大锅？',
    options: [
      { id: 'babdoduk', name: 'Ige Babdoduk', zh: '酱油蟹专门店', price: '₩15,000–25,000 / 人', area: '新济州',
        tags: ['米饭小偷', '果冻口感', '生腌控必选'],
        desc: '济州人气酱蟹店，螃蟹口感如果冻般滑嫩，蟹黄拌入海苔碎和米饭是"米饭小偷"级别的美味。还可以加点生腌虾和黑猪肉烤着吃。',
        address: '제주시 삼무로7길 23', apple: 'https://www.google.com/maps/search/이게밥도둑+제주' },
      { id: 'samsunghyeol', name: 'Samsunghyeol Haemul', zh: '三姓穴海鲜锅', price: '₩55,000 / 2–3人', area: '莲洞',
        tags: ['活海鲜', '团队首选', '排队名店'],
        desc: '济州最有名的海鲜锅店之一，满满一大锅活海鲜——鲍鱼、扇贝、螃蟹、章鱼端上来还在动。6人团的豪放型选择，吃完加泡面更绝。',
        address: '제주시 삼성로 67', apple: 'https://www.google.com/maps/search/삼성혈해물탕+제주' }
    ]
  },
  // ===== 🍖 正餐（追加） =====
  {
    id: 'q13', category: 'main-meal',
    title: '深夜食堂：鲍鱼参鸡汤 vs 黑猪肉猪蹄？',
    options: [
      { id: 'jiwon', name: 'Jiwon Samgyetang', zh: '鲍鱼参鸡汤', price: '₩11,000–15,000 / 人', area: '莲洞',
        tags: ['老夫妻店', '鲍鱼加持', '暖胃补身'],
        desc: '由一对老夫妻经营的参鸡汤小店，只做两种汤：普通参鸡汤和鲍鱼参鸡汤。用济州鲍鱼升级经典参鸡汤，暖胃又滋补，是深夜最好的收尾。',
        address: '제주시 연동 261-60', apple: 'https://www.google.com/maps/search/지원삼계탕+제주+연동' },
      { id: 'barojokbal', name: 'Baro Jokbal', zh: '黑猪肉猪蹄', price: '₩21,000–35,000 / 人', area: '济州市区',
        tags: ['Q弹胶原', '生菜包肉', '配啤酒绝了'],
        desc: '用济州黑猪肉做的猪蹄，比普通猪蹄更紧实Q弹。干卤后配上生菜和蒜片包着吃，再来一杯啤酒，是旅行夜晚最幸福的犒劳方式。',
        address: '제주시 관덕로 59', apple: 'https://www.google.com/maps/search/바로족발+제주+관덕로' }
    ]
  },
  // ===== 🍊 甜品&体验 =====
  {
    id: 'q12', category: 'dessert-exp',
    title: '柑橘甜品：汉拿峰面包 vs 采橘体验？',
    options: [
      { id: 'hallabong', name: 'Aewol Bbang Factory', zh: '汉拿峰慕斯面包', price: '₩5,000–9,000 / 人', area: '涯月',
        tags: ['汉拿峰慕斯', '面包控', '涯月打卡'],
        desc: '涯月人气面包工厂，用济州特产汉拿峰制作的慕斯是招牌。还有玄武岩米面包和涯月三明治等独家甜品，是西线咖啡厅巡礼的必经之站。',
        address: '제주시 애월읍 금성5길 42-15', apple: 'https://www.google.com/maps/search/애월빵공장+제주' },
      { id: 'gamgyulfarm', name: 'Jeju Tangerine Farm', zh: '柑橘采摘体验', price: '₩10,000–15,000 / 人', area: '西归浦',
        tags: ['亲手采摘', '柑橘园', '体验型'],
        desc: '不只是吃甜品，而是走进柑橘园亲手采摘济州蜜橘。摘下来直接吃的新鲜度无可替代，还可以带走1-2公斤。适合想要"动手体验"的团队。',
        address: '서귀포시 남원읍 감귤체험로', apple: 'https://www.google.com/maps/search/감귤체험농장+서귀포+남원' }
    ]
  },
  {
    id: 'q14', category: 'dessert-exp',
    title: '旅途收尾：市场巡游 vs 牛岛冰淇淋？',
    options: [
      { id: 'ollemarket', name: 'Seogwipo Olle Market', zh: '西归浦每日市场', price: '₩5,000–15,000 / 人', area: '西归浦',
        tags: ['传统市场', '自由逛吃', '一站体验'],
        desc: '西归浦最大的传统市场，200多个摊位集合了黑猪肉串、海鲜煎饼、柑橘甜品、花生饺子等济州风味。6人团自由分流、各取所需，是旅途收尾的完美句号。',
        address: '서귀포시 중앙로62번길 18', apple: 'https://www.google.com/maps/search/서귀포매일올레시장' },
      { id: 'udoicecream', name: 'Udo Peanut Ice Cream', zh: '牛岛花生冰淇淋', price: '₩4,000–5,000 / 人', area: '牛岛',
        tags: ['牛岛限定', '花生香浓', '半日游'],
        desc: '牛岛是济州东侧的离岛，坐渡轮15分钟到达。用牛岛本地花生做的冰淇淋香浓醇厚，是岛上的标志性甜品。顺便还能看牛岛绝美海景，一举两得。',
        address: '우도 (성산항에서 페리)', apple: 'https://www.google.com/maps/search/우도+성산항+제주' }
    ]
  },
  {
    id: 'q15', category: 'dessert-exp',
    title: '济州休闲：三丽鸥主题咖啡 vs 韩式炸鸡？',
    options: [
      { id: 'loungej', name: 'Lounge J', zh: '三丽鸥主题咖啡馆', price: '₩5,000–10,000 / 人', area: '道头海岸',
        tags: ['三丽鸥联名', '海景咖啡', '打卡圣地'],
        desc: '济州航空在道头海岸道路开设的主题空间。1楼是三丽鸥联名周边店（Hello Kitty·酷洛米·大耳狗），2楼是海景咖啡厅+三丽鸥拍照区，还能看到飞机起降。',
        address: '제주시 서해안로 360', apple: 'https://www.google.com/maps/search/라운지제이+제주+도두' },
      { id: 'bhc', name: 'BHC치킨 제주탑동점', zh: '韩式炸鸡名店', price: '₩18,000–22,000 / 份', area: '塔洞',
        tags: ['뿌링클炸鸡', '深夜宵夜', '韩国NO.1'],
        desc: '韩国门店数量第一的炸鸡品牌，招牌뿌링클是芝士香草粉裹炸鸡，酥脆咸香。塔洞店位于济州市中心，营业到凌晨，是夜游后的完美宵夜选择。',
        address: '제주시 중앙로 20', apple: 'https://www.google.com/maps/search/BHC치킨+제주탑동점' }
    ]
  },
];
