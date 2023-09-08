import React, { useState } from 'react';

const CreateArticle: React.FC = () => {
  const [title, setTitle] = useState<string>(''); // ブログタイトルの状態を追加
  const [sections, setSections] = useState<{ title: string; content: string }[]>([
    { title: '', content: '' }, // 初期のセクション
  ]);

  const addSection = () => {
    setSections([...sections, { title: '', content: '' }]);
  };

  const removeSection = (index: number) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const updateSectionTitle = (index: number, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index].title = value;
    setSections(updatedSections);
  };

  const updateSectionContent = (index: number, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index].content = value;
    setSections(updatedSections);
  };

  const saveArticle = async () => {
		console.log("se-bu!")
    try {
      // セクションデータとタイトルをサーバーに送信
      const response = await fetch('http://127.0.0.1:5000/api/create_article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, sections }), // タイトルとセクションデータをJSON形式で送信
      });

			console.log("タイトルは"+title+"記事は"+sections)

      if (response.ok) {
        console.log('Article saved successfully');
      } else {
        throw new Error('APIエラー');
      }
    } catch (error) {
      console.error('エラー:', error);
    }
  };

  return (
    <div>
      <h1>Create an Article</h1>
      {/* ブログタイトルの入力フィールド */}
      <label>Blog Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      {sections.map((section, index) => (
        <div key={index}>
          <label>Section Title:</label>
          <input
            type="text"
            value={section.title}
            onChange={(e) => updateSectionTitle(index, e.target.value)}
          />
          <br />
          <label>Section Content:</label>
          <textarea
            value={section.content}
            onChange={(e) => updateSectionContent(index, e.target.value)}
          ></textarea>
          <button onClick={() => removeSection(index)}>Remove Section</button>
        </div>
      ))}
      <button onClick={addSection}>Add Section</button>
      <button onClick={saveArticle}>Save Article</button>
    </div>
  );
};

export default CreateArticle;