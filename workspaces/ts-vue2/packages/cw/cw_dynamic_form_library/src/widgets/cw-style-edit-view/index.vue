<template>
    <div>
        <a-textarea v-model="currentValue"></a-textarea>
    </div>
</template>

<script>
export default {
    name:"cw-style-edit-view",
    props:{
        value:{
            type:String
        }
    },
    data(){
        return {
            currentValue:''
        }
    },
    watch:{
        currentValue:{
            handler(value){
                this.$emit('change',value)
            }, 
        },
        value:{
            handler(value){
                this.currentValue = value
            },
            immediate:true
        }
    }
}
</script>
<style>

</style>