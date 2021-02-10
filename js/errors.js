Vue.component('errorcomp', {
    data() {
        return {
            errorText: '',
            defErrorText: 'Ой! Что-то пошло не так :( ',
            isShow: false,
        }
    },
    methods: {
        showError(text) {
            this.errorText = text;
            this.isShow = true;
        },
    },
    template: `<div v-show="isShow" class="errors">
                    <div>{{defErrorText}}\&#129300;<br>{{errorText}}</div>
               </div>`,
});