import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { TextEditContentProps } from './text-edit-content.types';

const TextEditContent = React.memo<TextEditContentProps>(({ edit }) => {
  return (
    <ReactDiffViewer
      oldValue={edit.previousValue}
      newValue={edit.newValue}
      splitView={true}
      compareMethod={DiffMethod.WORDS_WITH_SPACE}
      hideLineNumbers={true}
      styles={{
        wordDiff: { display: 'inline', padding: 0 },
        marker: { display: 'none' },
        content: {
          width: '50%',
          padding: '0 8px',
        },
        contentText: { fontFamily: 'Helvetica' },
      }}
    />
  );
});

TextEditContent.displayName = 'TextEditContent';

export default TextEditContent;
