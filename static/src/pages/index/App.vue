<template>
  <div>
    <top-nav></top-nav>
    <left-col></left-col>
    <middle-col></middle-col>
    <right-col></right-col>
  </div>
</template>

<script>
import leftCol from '../../components/left-col';
import middleCol from '../../components/middle-col';
import rightCol from '../../components/right-col';

export default {
  data () {
    return {

    }
  },
  components: {
    leftCol,
    middleCol,
    rightCol
  }
}
</script>

<style lang="less">

</style>