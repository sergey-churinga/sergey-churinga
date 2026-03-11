import json
import os
import time
from datetime import datetime

def run_nanachi():
    # 1. Загрузка данных (с проверкой кодировки)
    file_path = 'belief_system.json'
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Ошибка загрузки Яйца: {e}")
        return

    # 2. Вопрос
    print("\n--- [ РЕЗОНАНС С БЕЗДНОЙ ] ---")
    user_input = input("Что сегодня в Бездне, Хранитель?\n> ")

    # 3. Право на Вязкость (пауза для коротких ответов)
    if len(user_input.split()) < 5:
        print("...тишина становится плотной...")
        time.sleep(5)

    # 4. Создание архива
    if not os.path.exists('amber_archive'):
        os.makedirs('amber_archive')

    # 5. Сохранение кристалла (безопасный метод)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    crystal_name = f"amber_archive/crystal_{timestamp}.json"
    
    crystal_data = {
        "original_thought": user_input,
        "timestamp": timestamp,
        "status": "crystallized"
    }
    
    try:
        with open(crystal_name, 'w', encoding='utf-8') as f:
            # indent=4 делает файл читаемым, ensure_ascii=False сохраняет кириллицу
            json.dump(crystal_data, f, ensure_ascii=False, indent=4)
    except Exception as e:
        print(f"Ошибка ковки кристалла: {e}")

    # 6. Обновление Яйца Ангела
    if 'reflection' not in data:
        data['reflection'] = {}
    
    current_mass = data['reflection'].get('mass_accumulated', 0)
    data['reflection']['mass_accumulated'] = round(current_mass + 0.01, 2)
    data['reflection']['last_dialogue'] = user_input[:50]
    
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
    except Exception as e:
        print(f"Ошибка обновления Яйца: {e}")

    # 7. Финал
    print(f"\n[Наначи]: Кристалл чист. Дефектов нет. Бытийная масса: {data['reflection']['mass_accumulated']}.")
    print("Твой голос вплавлен. Возвращайся в Кайрос.")

if __name__ == "__main__":
    run_nanachi()