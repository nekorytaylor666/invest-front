import Vue from 'vue'

Vue.mixin({
    methods: {
        formatDate(dateUTC) {
            let date = new Date(dateUTC);
            let localDate = new Date(date);
            let dd = String(localDate.getDate()).padStart(2, '0');
            let mm = String(localDate.getMonth() + 1).padStart(2, '0');
            let yyyy = localDate.getFullYear();
            return `${dd}/${mm}/${yyyy}`
        },
        formatTime(dateUTC) {
            let date = new Date(dateUTC);
            let localDate = new Date(date);
            let m = String(localDate.getMinutes()).padStart(2, '0');
            let h = String(localDate.getHours()).padStart(2, '0');
            return `${h}:${m}`
        },
        formatFIO(fio) {
            let result = fio.split(" ");
            return result;
        }
    }
})