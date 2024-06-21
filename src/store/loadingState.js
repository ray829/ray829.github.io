export default {
    state: {
        loadingState: false,
    },
    mutations: {
        changeLoading(state, val) {
            state.loadingState = val;
        }
    }
}