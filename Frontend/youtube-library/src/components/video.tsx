import React, { FunctionComponent, useEffect, useState } from 'react';
import CSS from 'csstype';

type Props = {
  title: string,
  id: string,
}

export const Video: FunctionComponent<Props> = ({ title, id }: Props)=> {

  return <>
  <div >
    <div >
      {title}
    </div>
  </div>
  </>
}
