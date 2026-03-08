export type CategoryId = 'main-meal' | 'cafe-tea';

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
  { id: 'cafe-tea', label: '咖啡&下午茶', emoji: '☕' },
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
        address: '24 Gwiarang-gil, Jeju-si', apple: 'https://maps.apple.com/?q=Olle+Guksu+Jeju' },
      { id: 'samdae', name: 'Samdae Guksu Heogwan', zh: '老牌猪肉面馆', price: '¥70 / 人', area: '新济州',
        tags: ['老资格', '汤更浓', '面馆对决'],
        desc: '济州高知名度猪肉面馆，氛围更老资格，汤底更浓郁，是会引发队友分裂投票的对位选手。',
        address: '32 Sin-daero 20-gil, Jeju-si', apple: 'https://maps.apple.com/?q=Samdae+Guksu+Heogwan+Jeju' }
    ]
  },
  {
    id: 'q2', category: 'main-meal',
    title: '唯一一顿黑猪肉，投给谁？',
    options: [
      { id: 'sukseongdo', name: 'Sukseongdo', zh: '熟成黑猪肉', price: '¥220 / 人', area: '新济州',
        tags: ['熟成系', '店员代烤', '体验完整'],
        desc: '把这趟必须吃的一顿黑猪肉集中在这里解决。熟成、代烤、体验完整，适合作为济州黑猪肉的唯一代表。',
        address: '41 Wonnohyeong-ro, Jeju-si', apple: 'https://maps.apple.com/?q=Sukseongdo+Jeju' },
      { id: 'donsadon', name: 'Donsadon', zh: '传统黑猪肉名店', price: '¥200 / 人', area: '新济州',
        tags: ['传统派', '炭火感', '老资格'],
        desc: '如果队友执着于"更经典、更传统"的黑猪肉店，这一票大概率会投给它。炭火感更强，氛围更老派。',
        address: '19 Upyeong-ro, Jeju-si', apple: 'https://maps.apple.com/?q=Donsadon+Jeju' }
    ]
  },
  {
    id: 'q3', category: 'main-meal',
    title: '海鲜正餐：稳准狠团体局 vs 海女文化体验？',
    options: [
      { id: 'gozip', name: 'Gozip Dol Wooluck', zh: '海鲜正餐', price: '¥250–350 / 人', area: 'Hamdok',
        tags: ['多人稳选', '海鲜主战场', '好评稳定'],
        desc: '更适合"6 个人都想吃爽一点"的团体局。稳定、鲜味足、相对不容易翻车，是高票候选。',
        address: '2F, 491-9 Sinbuk-ro, Jocheon-eup, Jeju-si', apple: 'https://maps.apple.com/?q=Gozip+Dol+Wooluck+Hamdeok+Jeju' },
      { id: 'haenyeo', name: "Haenyeo's Kitchen", zh: '海女文化体验餐', price: '₩69,000–89,000 / 人', area: 'Bukchon',
        tags: ['文化体验', '故事性强', '济州限定'],
        desc: '不只是吃饱，而是把海女文化、演出感和济州记忆一起打包。适合想要一个独特记忆坐标的团队。',
        address: '31 Bukchon 9-gil, Jocheon-eup, Jeju-si', apple: "https://maps.apple.com/?q=Haenyeo's+Kitchen+Bukchon+Jeju" }
    ]
  },
  {
    id: 'q4', category: 'main-meal',
    title: '高级晚餐：自助百汇 vs 正式韩式烤肉？',
    options: [
      { id: 'grandkitchen', name: 'Grand Kitchen', zh: 'Grand Hyatt 高配自助', price: '高预算', area: 'Dream Tower',
        tags: ['多人最稳', '选择超多', '意见分裂时首选'],
        desc: '非常适合 6 人团队。有人吃海鲜，有人吃肉，有人冲甜点，意见分裂时它就是最稳的解决方案。',
        address: '12 Noyeon-ro, Jeju-si', apple: 'https://maps.apple.com/?q=Grand+Kitchen+Grand+Hyatt+Jeju' },
      { id: 'noknamu', name: 'Noknamu', zh: '高级韩式烤肉', price: '高预算', area: 'Dream Tower',
        tags: ['正式晚宴', '酒店系', '更聚焦'],
        desc: '如果大家想把晚餐做成更正式的"认真吃一顿"，Noknamu 会更像收束得漂亮的一餐。',
        address: '12 Noyeon-ro, Jeju-si', apple: 'https://maps.apple.com/?q=Noknamu+Jeju+Dream+Tower' }
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
        address: '85 Dongbok-ro, Gujwa-eup, Jeju-si', apple: 'https://maps.apple.com/?q=London+Bagel+Museum+Jeju' },
      { id: 'layered', name: 'Cafe Layered Jeju', zh: '英式甜点烘焙', price: '¥60–100 / 人', area: '东线 Gujwa',
        tags: ['司康派', '英式氛围', '甜点友好'],
        desc: '与 London Bagel Museum 同片区，风格更偏英式烘焙与下午茶审美，适合不那么迷恋贝果的人。',
        address: '85 Dongbok-ro, Gujwa-eup, Jeju-si', apple: 'https://maps.apple.com/?q=Cafe+Layered+Jeju' }
    ]
  },
  {
    id: 'q6', category: 'cafe-tea',
    title: '下午茶：海边咖啡馆 vs 东门市场小吃？',
    options: [
      { id: 'antoinette', name: 'Antoinette', zh: '海边烘焙咖啡馆', price: '¥50–80 / 人', area: '机场海边线',
        tags: ['海边烘焙', '轻盈甜点', '度假感'],
        desc: '海边、面包、咖啡，一下子就有"已经开始度假"的感觉。适合把下午过得松弛一点。',
        address: '671 Seohaean-ro, Jeju-si', apple: 'https://maps.apple.com/?q=Antoinette+Jeju' },
      { id: 'dongmun', name: 'Dongmun Market', zh: '东门市场小吃巡游', price: '自由点单', area: '老城区',
        tags: ['边走边吃', '高自由度', '旅行气氛'],
        desc: '6 人团队模式的最佳选项：谁想吃海鲜煎饼、谁想吃橘子甜点，直接现场分流，不用统一意见。',
        address: '20 Gwandeok-ro 14-gil, Jeju-si', apple: 'https://maps.apple.com/?q=Dongmun+Market+Jeju' }
    ]
  },
  {
    id: 'q7', category: 'cafe-tea',
    title: '海边咖啡：经典大窗海景 vs 可爱小屋风？',
    options: [
      { id: 'delmoondo', name: 'Cafe Delmoondo', zh: '经典海景咖啡', price: '¥45–80 / 人', area: 'Hamdok',
        tags: ['经典海景', '大玻璃窗', '看海发呆'],
        desc: '更经典、完成度更高，也更像第一次来济州时脑中会浮现的"海景咖啡馆标准答案"。',
        address: '519-10 Johamhaean-ro, Jocheon-eup, Jeju-si', apple: 'https://maps.apple.com/?q=Cafe+Delmoondo+Jeju' },
      { id: 'bomnal', name: 'Bomnal Cafe', zh: '爱月海边小屋咖啡', price: '¥45–80 / 人', area: 'Aewol',
        tags: ['更可爱', '小屋感', '柑橘饮料'],
        desc: '如果团队偏爱更轻巧、更"海边小房子"的气质，这张票常常比 Delmoondo 更讨喜。',
        address: '25 Aewol-ro 1-gil, Aewol-eup, Jeju-si', apple: 'https://maps.apple.com/?q=Bomnal+Cafe+Jeju+Aewol' }
    ]
  },
];
