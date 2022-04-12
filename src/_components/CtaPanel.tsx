import React from 'react';

import { CtaMessagesEnum } from '../types/movies.model';

interface ICtaPanel
{
  ctaMessage: CtaMessagesEnum;
}

const CtaPanel = ({ ctaMessage }: ICtaPanel): JSX.Element =>
{
  return (
    <div className="cta-panel">
      {ctaMessage}
    </div>
  )
}

export default CtaPanel;