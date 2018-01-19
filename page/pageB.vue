<template lang="html">
  <div class="page-b">
    <div class="a-header page-b-header clearfix">
      <a href="javascript:;" @click="back" class="back">&lt;</a>
      <div class="text">Page B</div>
    </div>
    <div class="a-content page-b-content">
      <img src="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=635c6e65888ba61edfeecf29790ff037/b3fb43166d224f4af2cd1bbc03f790529922d1cd.jpg" >
      <h1>罐头鱼</h1>
      <p>
        罐头鱼是指将加工处理后的鱼装入马口铁罐、玻璃罐、复合薄膜蒸煮袋或其他包装材料容器经排气、密封、加热杀菌、冷却等工序，达到商业无菌的食品。
      </p>
      <p>
        鱼类肌肉及其他可食部分富含蛋白质、低脂肪和多不饱和脂肪酸多种维生素和无机质，它可以调节和改善人类的食物结构，供应人类健康所必需的营养素，而罐头鱼因其携带方便、清洁卫生更是受到多数国家尤其是发达国家的青睐。
      </p>

      <h1>原辅材料</h1>
      <p>1、原料鱼：用于加工罐头的海水鱼、淡水鱼质量应符合NY/T 842的规定。</p>
      <p>2、辅料：食用油和食用盐分别符合NY/T 751和NY/T 1040的规定，其他辅料应符合相应标的规定。</p>
      <p>3、食品添加剂：食品添加剂品种及其使用量应符合GB2760规定。</p>
      <img src="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D250/sign=a18162c9014f78f0840b9df649300a83/03087bf40ad162d9a8bf9e8113dfa9ec8b13cdde.jpg" >

      <h1>生产工艺</h1>
      <p>1、原料处理选用鱼体完整，气味正常，肌肉有弹性的新鲜小鱼，挤净内脏，充分漂洗，尽量洗去小鳞片。</p>
      <p>2、盐渍晾晒每100公斤小鱼加食盐1公斤、料酒0.5公斤，翻拌均匀后放置10分钟左右，翻动1～2次。盐渍后立即取出，沥去盐水，用清水淘洗1次，放阳光下晾晒至八成干。</p>
      <p>3、油炸将晒好的小鱼投入油锅炸，油温180～200℃，时间2～5分钟，投入量约为锅内油量的1/12。轻轻翻动，当小鱼呈浅黄色时捞出。</p>
      <p>4、汤液配制调味液配方：砂糖150克、味精45克、精盐3公斤、花椒75克、大料50克、胡椒粉60克、明胶粉450克、辣椒油50毫升、生姜180克、蒜瓣180克、葱180克、酱油5公斤、醋精10毫升、水80公斤。将生姜、葱、蒜瓣洗净捶烂，装入纱布袋中，与花椒、大料一起投入水锅中。水煮沸后分别投入精盐、砂糖、胡椒粉、酱油，搅拌后保持微沸25分钟，再加入明胶粉化开。然后停止加热，滤去渣。过滤后加入味精、辣椒油、醋精，拌匀备用。</p>
      <p>5、装罐排气将小鱼用筷子夹入罐头瓶中，每罐装小鱼350克，加汤汁150克。将装好的罐头放入排气箱中，排气时要求罐中心温度75～80℃，时间10分钟。如采用真空压盖机，可免去排气工序，直接抽空压盖。</p>
      <p>6、密封杀菌采用普通封口机或真空压盖机进行密封，然后放入高压锅内杀菌。要求15分钟内将高压锅温度升至118℃，维持这个温度65分钟进行杀菌。然后经20分钟降温冷却至40℃以下，擦净罐身，罐盖涂防锈油，贴标签入库贮藏。</p>
      <img src="https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=7cfab5748f1001e94a3c130d880f7b06/9d82d158ccbf6c815f3cd075be3eb13533fa4020.jpg">
      <img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=79d65abeb27eca8016053ee5a1229712/8d5494eef01f3a29e63229539b25bc315d607cb1.jpg">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      history.back();
    },
  },
}
</script>

<style lang="css">
.page-b-header {
  background: #2c7fff;
}
.page-b-content img {
  display: block;
  width: 100%;
}
.page-b-content p, .page-b-content h1, .page-b-content h2 {
  margin: 10px 0;
}
</style>
