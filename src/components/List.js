import React from 'react';
import { Box } from '@chakra-ui/core';
import CodeSnippet from './CodeSnippet';

const SnippetList = props => {
  const { data } = props;
  
  return (
    <Box mt="60px">
      {data &&
        data.map(snippet => (
          <CodeSnippet
            key={snippet.id}
            id={snippet.id}
            title={snippet.title}
            description={snippet.description}
            content={snippet.content}
            tags={snippet.tags}
            url={snippet.sourceUrl}
          />
        ))}
    </Box>
  );
};

export default SnippetList;
