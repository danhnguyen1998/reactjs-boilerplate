import {
  AuditOutlined,
  DingtalkOutlined,
  EditOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { TFunction } from 'i18next';
import React from 'react';
import RouteTypes from './RouterTypes';

export const routeCustomer = (t: TFunction): RouteTypes => {
  return {
    routes: [
      {
        path: '/',
        breadcrumbName: t('common:customer.menu.home'),
        name: t('common:customer.menu.home'),
        icon: <HomeOutlined />,
      },
      {
        path: '/competition-sign-up',
        breadcrumbName: t('common:customer.menu.competitionSignup'),
        name: t('common:customer.menu.competitionSignup'),
        icon: <EditOutlined />,
      },
      {
        path: '/login',
        breadcrumbName: t('common:customer.menu.signin'),
        hideInMenu: true,
        name: t('common:customer.menu.signin'),
      },
    ],
  };
};

export const routeManager = (t: TFunction): RouteTypes => {
  return {
    routes: [
      {
        path: '/manager',
        breadcrumbName: t('common:manager.menu.home'),
        name: t('common:manager.menu.home'),
        icon: <HomeOutlined />,
      },
      {
        path: '/manager/categories',
        name: t('common:manager.menu.categories'),
        icon: <UnorderedListOutlined />,
        children: [
          {
            path: 'age',
            breadcrumbName: t('common:manager.menu.categoriesAge'),
            name: t('common:manager.menu.categoriesAge'),
          },
          {
            path: 'dancetypes',
            breadcrumbName: t('common:manager.menu.categoriesDanceTypes'),
            name: t('common:manager.menu.categoriesDanceTypes'),
          },
          {
            path: 'dance',
            breadcrumbName: t('common:manager.menu.categoriesDance'),
            name: t('common:manager.menu.categoriesDance'),
          },
          {
            path: 'level',
            breadcrumbName: t('common:manager.menu.categoriesLevel'),
            name: t('common:manager.menu.categoriesLevel'),
          },
          {
            path: 'type',
            breadcrumbName: t('common:manager.menu.categoriesType'),
            name: t('common:manager.menu.categoriesType'),
          },
          // {
          //   path: "club",
          //   breadcrumbName: t("common:manager.menu.categoriesClub"),
          //   name: t("common:manager.menu.categoriesClub"),
          // },
          {
            path: 'accounts',
            breadcrumbName: t('common:manager.menu.categoriesAccount'),
            name: t('common:manager.menu.categoriesAccount'),
          },
        ],
      },
      {
        path: '/manager/tournaments',
        breadcrumbName: t('common:manager.menu.tournaments'),
        name: t('common:manager.menu.tournaments'),
        icon: <DingtalkOutlined />,
        children: [
          {
            path: 'add',
            breadcrumbName: t('common:manager.menu.tournamentsAdd'),
            name: t('common:manager.menu.tournamentsAdd'),
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/manager/competition',
        breadcrumbName: t('common:manager.menu.contentCompetition'),
        name: t('common:manager.menu.contentCompetition'),
        icon: <AuditOutlined />,
      },
      {
        path: '/manager/athletes',
        breadcrumbName: t('common:manager.menu.managingAthletes'),
        name: t('common:manager.menu.managingAthletes'),
        icon: <UsergroupAddOutlined />,
      },
    ],
  };
};
