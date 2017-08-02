import React from 'react';

type Props = {
  citation: {
    id: number,
    title: string,
    source: string,
    quote: string,
    user_id: number
  },
  
  currentUserCitationIds: Array
};

const CitationListItem = ({ citation, currentUserCitationIds, onCitationJoin }: Props) => {
  return (
    <div key={citation.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <span style={{ marginRight: '8px' }}>{citation.title}</span>
    </div>
  );
};

export default CitationListItem;