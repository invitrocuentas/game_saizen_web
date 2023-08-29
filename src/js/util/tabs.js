const tabsCambiar = () => {
    if(document.querySelector('.tab')){
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active-tab'));
                tab.classList.add('active-tab');
                tabContents.forEach(tc => tc.classList.remove('active-content'));
                tabContents[index].classList.add('active-content');
            });
        });
    }
};

export {
    tabsCambiar
};