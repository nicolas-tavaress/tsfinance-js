import UsersList from '@/views/users/list.vue';
import UsersCreate from '@/views/users/create.vue';
import UsersEdit from '@/views/users/edit.vue';

export const userRoutes = [
  {
    path: '/users',
    name: 'Users',
    component: UsersList
  },
  {
    path: '/users/create',
    name: 'UsersCreate',
    component: UsersCreate
  },
  {
    path: '/users/:id/edit',
    name: 'UsersEdit',
    component: UsersEdit
  }
];

export default userRoutes;
