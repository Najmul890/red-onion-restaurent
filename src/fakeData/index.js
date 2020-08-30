import breakfastItems from './breakfastItem';
import lunchItems from './lunchItem';
import dinnerItems from './dinnerItem';

const fakeData = [...breakfastItems, ...lunchItems, ...dinnerItems];


const shuffle = a => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

shuffle(fakeData);

export default fakeData;