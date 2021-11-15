import { Badge } from 'antd';
import React, { CSSProperties } from 'react';
import './estimate-badge.scss';
import { EstimateBadgeProps } from './estimate-badge.types';

const minColor = [245, 218, 66];
const maxColor = [245, 144, 66];
const minEstimate = 0;
const maxEstimate = 20;

const EstimateBadge = React.memo<EstimateBadgeProps>(({ value }) => {
  const mG = (maxColor[1] - minColor[1]) / (maxEstimate - minEstimate);
  const nG = -mG * maxEstimate + maxColor[1];

  const badgeStyle: CSSProperties = {
    backgroundColor: `rgb(255, ${mG * value + nG}, 0)`,
  };

  return (
    <Badge
      showZero
      count={value}
      className="estimate-badge"
      style={badgeStyle}
    />
  );
});

EstimateBadge.displayName = 'EstimateBadge';

export default EstimateBadge;
