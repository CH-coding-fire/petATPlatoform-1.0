export const cnTrans = (englishString) => {
   if (chineseDict[englishString]==undefined) {
      return englishString
   }else {
      return chineseDict[englishString];
   }
}

const chineseDict = {
    mammals: '哺乳類',
    reptiles: '爬蟲類',
    amphibians: '兩棲類',
    birds: '鳥類',
    insectsOrInvertebrate: '昆蟲或無脊椎動物',
    fishOrAquatic: '魚類或水中生物',
    plants: '植物',
    others: '其他',
    cats: '貓',
    dogs: '狗',
    rodents: '鼠類',
    rabbits: '兔子',
    erinaceidae: '蝟科',
    ants: '螞蟻',
    frogs: '青蛙',
    toads: '蟾蜍',
    salamanders: '蠑螈',
    snakes: '蛇',
    lizards: '蜥蜴',
    turtles: '龜',
    others: '其他',
    ants:'螞蟻'  ,
	scorpions :'蠍子' ,
	crickets :'蟋蟀'  ,
	spiders :'蜘蛛'  ,
	beetles :'甲蟲'  ,
    mantis: '螳螂',
    hamsters: '倉鼠',
    guineaPigs: '天竺鼠',
    mouses: '花枝鼠',
    gerbils: '沙鼠',
    freshwater: '淡水類',
    seawater: '海水類',
    male: '雄性',
    female: '雌性',
    unknownSexOrNa: '不明/不適用',
    notUrgent: '不緊急',
    slightlyUrgent: '半緊急 (需1-3個月內領走)',
    urgent: '緊急 (需1-3個星期內領走)',
    mostUrgent:'非常緊急 (需幾天內領走)'













}