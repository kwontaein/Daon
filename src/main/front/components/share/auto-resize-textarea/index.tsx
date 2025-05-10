import React, { useRef } from 'react';

export default function AutoResizeTextArea(props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 높이를 초기화한 후
      textarea.style.height = textarea.scrollHeight + 'px'; // 내용 높이만큼 재설정
    }
  };

  return (
    <textarea
      ref={textareaRef}
      onChange={handleChange}
      style={{
        overflow: 'hidden',
        resize: 'none',
        minHeight:'300px',
        padding:'5px'
      }}
      rows={1}
      {...props}
    />
  );
}