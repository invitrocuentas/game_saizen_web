const tabsCambiar = () => {
    if(document.querySelector('.tab')){
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');
        window.parent.slugProduct =  'alimentacion';

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                window.parent.slugProduct =  tab.getAttribute('data-nombre');

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