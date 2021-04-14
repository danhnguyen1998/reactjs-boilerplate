import { Card } from 'antd';
import React from 'react';
import ClubForm from './clubForm';
import ClubList from './clubList';

export default function ManagerClub(props: any) {
  return (
    <>
      <Card>
        <ClubForm />
        <ClubList />
      </Card>
    </>
  );
}
