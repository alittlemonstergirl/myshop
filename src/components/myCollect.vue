<template>
  <div class="myCollect">
    <ul class="cshop_list">
      <li>
        <div class="shopImg"><img src="../assets/images/s1.png"
            alt=""></div>
        <div class="shopDetail">
          <h4>英吉利海峡服装店</h4>
          <p>★★★★☆</p>
          <p>鹤山步行街 <span>最低五折优惠</span> </p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {};
</script>
<style>
.myCollect > ul > li {
  display: flex;
  margin: 0.2rem;
}
.shopImg {
  width: 2.5rem;
  margin-right: 0.3rem;
}
.shopDetail {
  line-height: 0.75rem;
}
</style>
