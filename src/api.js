import { mockPaintings } from './mockData.js';

export async function getPaintings() {
    try {
        // Используем локальные mock данные
        // В будущем можно подключить настоящий API
        return mockPaintings;
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        return mockPaintings;
    }
}