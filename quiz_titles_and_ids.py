import json

# Load the quizzes data
with open('data/quizzes.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Create list of quiz titles and IDs
quiz_list = []

for i, quiz in enumerate(data, 1):
    quiz_entry = {
        "number": i,
        "id": quiz.get('id', 'No ID'),
        "title": quiz.get('title', 'No Title')
    }
    quiz_list.append(quiz_entry)

# Export to JSON file
output_file = 'quiz_titles_and_ids.json'
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(quiz_list, f, indent=2, ensure_ascii=False)

print(f'Exported {len(quiz_list)} quiz titles and IDs to {output_file}')
print(f'Total quizzes: {len(data)}')

# Also create a simplified version with just ID and title
simplified_list = [{"id": quiz.get('id'), "title": quiz.get('title')} for quiz in data]

simplified_file = 'quiz_titles_and_ids_simple.json'
with open(simplified_file, 'w', encoding='utf-8') as f:
    json.dump(simplified_list, f, indent=2, ensure_ascii=False)

print(f'Also created simplified version: {simplified_file}') 