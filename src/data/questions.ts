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
  day: string;
  meal: string;
  title: string;
  options: [QuestionOption, QuestionOption];
}

export const QUESTIONS: Question[] = [
  {
    id: 'q1', day: '4月4日', meal: '午餐',
    title: '落地第一顿：济州猪肉面，选哪一家？',
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
    id: 'q2', day: '4月4日', meal: '下午茶',
    title: '第一天下午：海边咖啡馆，还是东门市场？',
    options: [
      { id: 'antoinette', name: 'Antoinette', zh: '海边烘焙咖啡馆', price: '¥50–80 / 人', area: '机场海边线',
        tags: ['海边烘焙', '轻盈甜点', '度假感'],
        desc: '海边、面包、咖啡，一下子就有"已经开始度假"的感觉。适合把第一天下午过得松弛一点。',
        address: '671 Seohaean-ro, Jeju-si', apple: 'https://maps.apple.com/?q=Antoinette+Jeju' },
      { id: 'dongmun', name: 'Dongmun Market', zh: '东门市场小吃巡游', price: '自由点单', area: '老城区',
        tags: ['边走边吃', '高自由度', '旅行气氛'],
        desc: '6 人团队模式的最佳选项：谁想吃海鲜煎饼、谁想吃橘子甜点，直接现场分流，不用统一意见。',
        address: '20 Gwandeok-ro 14-gil, Jeju-si', apple: 'https://maps.apple.com/?q=Dongmun+Market+Jeju' }
    ]
  },
  {
    id: 'q3', day: '4月4日', meal: '晚餐',
    title: '唯一一顿黑猪肉主战场，投给谁？',
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
    id: 'q4', day: '4月5日', meal: '早午餐',
    title: '第二天早午餐：贝果派还是英式烘焙派？',
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
    id: 'q5', day: '4月5日', meal: '午餐',
    title: '中午：稳准狠海鲜正餐，还是海女文化体验？',
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
    id: 'q6', day: '4月5日', meal: '下午茶',
    title: '第二天下午：喝哪一杯海边咖啡？',
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
  {
    id: 'q7', day: '4月5日', meal: '晚餐',
    title: '第二天晚餐：自助百汇，还是正式韩式烤肉？',
    options: [
      { id: 'grandkitchen', name: 'Grand Kitchen', zh: 'Grand Hyatt 高配自助', price: '高预算', area: 'Dream Tower',
        tags: ['多人最稳', '选择超多', '意见分裂时首选'],
        desc: '非常适合 6 人团队。有人吃海鲜，有人吃肉，有人冲甜点，意见分裂时它就是最稳的解决方案。',
        address: '12 Noyeon-ro, Jeju-si', apple: 'https://maps.apple.com/?q=Grand+Kitchen+Grand+Hyatt+Jeju' },
      { id: 'noknamu', name: 'Noknamu', zh: '高级韩式烤肉', price: '高预算', area: 'Dream Tower',
        tags: ['正式晚宴', '酒店系', '更聚焦'],
        desc: '如果大家想把第二晚做成更正式的"认真吃一顿"，Noknamu 会更像收束得漂亮的一餐。',
        address: '12 Noyeon-ro, Jeju-si', apple: 'https://maps.apple.com/?q=Noknamu+Jeju+Dream+Tower' }
    ]
  },
  {
    id: 'q8', day: '4月6日', meal: '早午餐',
    title: '最后一天早午餐：市场自由分流，还是海边面包房？',
    options: [
      { id: 'dongmun2', name: 'Dongmun Market', zh: '自由小吃局', price: '自由点单', area: '老城区',
        tags: ['各买各的', '最适合多人', '弹性高'],
        desc: '最后一天很适合用市场来收口。大家不需要统一菜系，谁想喝汤、吃煎饼、买水果，自由组合。',
        address: '20 Gwandeok-ro 14-gil, Jeju-si', apple: 'https://maps.apple.com/?q=Dongmun+Market+Jeju' },
      { id: 'antoinette2', name: 'Antoinette', zh: '海边面包咖啡', price: '¥50–80 / 人', area: '机场海边线',
        tags: ['轻盈收口', '海边早餐', '甜口友好'],
        desc: '如果前两天已经吃得比较重，这个选项让最后一天更松弛、更轻盈，也更适合拍一组漂亮早餐照。',
        address: '671 Seohaean-ro, Jeju-si', apple: 'https://maps.apple.com/?q=Antoinette+Jeju' }
    ]
  },
  {
    id: 'q9', day: '4月6日', meal: '午餐',
    title: '最后一天午餐：海女体验，还是海鲜正餐？',
    options: [
      { id: 'haenyeo2', name: "Haenyeo's Kitchen", zh: '海女文化体验餐', price: '₩69,000–89,000 / 人', area: 'Bukchon',
        tags: ['独特记忆点', '叙事体验', '济州限定'],
        desc: '如果前一天没选它，这里是补票位。它能让这趟旅行多一个"只有在济州才会成立"的记忆坐标。',
        address: '31 Bukchon 9-gil, Jocheon-eup, Jeju-si', apple: "https://maps.apple.com/?q=Haenyeo's+Kitchen+Bukchon+Jeju" },
      { id: 'gozip2', name: 'Gozip Dol Wooluck', zh: '海鲜正餐', price: '¥250–350 / 人', area: 'Hamdok',
        tags: ['稳定好吃', '团队友好', '吃爽一点'],
        desc: '如果更务实，想把最后一天午餐留给稳定发挥的海鲜正餐而不是体验型项目，这张票通常很有竞争力。',
        address: '2F, 491-9 Sinbuk-ro, Jocheon-eup, Jeju-si', apple: 'https://maps.apple.com/?q=Gozip+Dol+Wooluck+Hamdeok+Jeju' }
    ]
  },
  {
    id: 'q10', day: '4月6日', meal: '下午茶',
    title: '最后一个咖啡时段：东线海景还是西线小屋？',
    options: [
      { id: 'delmoondo2', name: 'Cafe Delmoondo', zh: '东线经典海景', price: '¥45–80 / 人', area: 'Hamdok',
        tags: ['经典票', '风景取胜', '愿望清单打勾'],
        desc: '这张票代表"把愿望清单里的经典海景咖啡打勾"。如果队友里有人最在乎风景，它很容易赢。',
        address: '519-10 Johamhaean-ro, Jocheon-eup, Jeju-si', apple: 'https://maps.apple.com/?q=Cafe+Delmoondo+Jeju' },
      { id: 'bomnal2', name: 'Bomnal Cafe', zh: '西线海边小屋', price: '¥45–80 / 人', area: 'Aewol',
        tags: ['更可爱', '更松弛', '柑橘饮料'],
        desc: '"最后一个下午，想坐在海边小房子里慢慢喝点什么。"会更柔软，也更适合收尾。',
        address: '25 Aewol-ro 1-gil, Aewol-eup, Jeju-si', apple: 'https://maps.apple.com/?q=Bomnal+Cafe+Jeju+Aewol' }
    ]
  },
  {
    id: 'q11', day: '4月6日', meal: '晚餐',
    title: '最后一顿怎么收官？',
    options: [
      { id: 'grandkitchen2', name: 'Grand Kitchen', zh: '高配自助收官', price: '高预算', area: 'Dream Tower',
        tags: ['最稳收官', '每人都满意', '体面'],
        desc: '如果最后还是希望统一意见最省力，这会是最保险也最适合团队的收官方案。',
        address: '12 Noyeon-ro, Jeju-si', apple: 'https://maps.apple.com/?q=Grand+Kitchen+Grand+Hyatt+Jeju' },
      { id: 'noknamu2', name: 'Noknamu', zh: '正式晚宴收官', price: '高预算', area: 'Dream Tower',
        tags: ['认真坐下来', '韩式高级烤肉', '结束得漂亮'],
        desc: '如果更想要一顿正式而完整的收尾晚餐，而不是分散型自助，Noknamu 的气质会更漂亮。',
        address: '12 Noyeon-ro, Jeju-si', apple: 'https://maps.apple.com/?q=Noknamu+Jeju+Dream+Tower' }
    ]
  }
];
