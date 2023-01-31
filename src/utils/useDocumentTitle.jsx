import { useEffect, useState } from 'react';

export default function useDocumentTitle(title) {
  const [docTitle, setDocTitle] = useState(title);

  useEffect(() => {
    document.title = docTitle;

    return () => {
      document.title = 'Calendar';
    };
  }, [docTitle]);

  return { docTitle, setDocTitle };
}
