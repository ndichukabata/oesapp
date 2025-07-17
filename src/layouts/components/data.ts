import { type MenuItemType } from '@/types/layout'
import { type IconType } from 'react-icons'
import {
  TbAlertHexagon,
  TbBan,
  TbBellRinging,
  TbBoxAlignTop,
  TbCreditCard,
  TbFiles,
  TbHeadset,
  TbLayout,
  TbLayoutDashboard,
  TbLayoutNavbar,
  TbLayoutSidebar,
  TbLock,
  TbLockAccess,
  TbLogout2,
  TbRocket,
  TbSettings2,
  TbShieldLock,
  TbSitemap,
  TbStackFront,
  TbStar,
  TbUserCircle,
  TbUserHexagon,
} from 'react-icons/tb'

type UserDropdownItemType = {
  label?: string
  icon?: IconType
  url?: string
  isDivider?: boolean
  isHeader?: boolean
  class?: string
}

export const userDropdownItems: UserDropdownItemType[] = [
  {
    label: 'Welcome back!',
    isHeader: true,
  },
  {
    label: 'Profile',
    icon: TbUserCircle,
    url: '/pages/profile',
  },
  {
    label: 'Notifications',
    icon: TbBellRinging,
    url: '#',
  },
  {
    label: 'Balance: $985.25',
    icon: TbCreditCard,
    url: '#',
  },
  {
    label: 'Account Settings',
    icon: TbSettings2,
    url: '#',
  },
  {
    label: 'Support Center',
    icon: TbHeadset,
    url: '#',
  },
  {
    isDivider: true,
  },
  {
    label: 'Lock Screen',
    icon: TbLock,
    url: '/auth-1/lock-screen',
  },
  {
    label: 'Log Out',
    icon: TbLogout2,
    url: '#',
    class: 'text-danger fw-semibold',
  },
]

export const menuItems: MenuItemType[] = [
  { key: 'menu', label: 'Menu', isTitle: true },
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: TbLayoutDashboard,
    url: '/dashboard',
  },
  {
    key: 'auth',
    label: 'Authentication',
    icon: TbLock,
    children: [
      {
        key: 'version-1',
        label: 'Version 1',
        parentKey: 'auth',
        children: [
          { key: 'sign-in', label: 'Sign In', url: '/auth-1/sign-in' },
          { key: 'sign-up', label: 'Sign Up', url: '/auth-1/sign-up' },
          { key: 'reset-pass', label: 'Reset Password', url: '/auth-1/reset-password' },
          { key: 'new-pass', label: 'New Password', url: '/auth-1/new-password' },
          { key: 'two-factor', label: 'Two Factor', url: '/auth-1/two-factor' },
          { key: 'lock-screen', label: 'Lock Screen', url: '/auth-1/lock-screen' },
          { key: 'success-mail', label: 'Success Mail', url: '/auth-1/success-mail' },
          { key: 'login-pin', label: 'Login with PIN', url: '/auth-1/login-pin' },
          { key: 'delete-account', label: 'Delete Account', url: '/auth-1/delete-account' },
        ],
      },
      {
        key: 'version-2',
        label: 'Version 2',
        parentKey: 'auth',
        children: [
          { key: 'sign-in-2', label: 'Sign In', url: '/auth-2/sign-in' },
          { key: 'sign-up-2', label: 'Sign Up', url: '/auth-2/sign-up' },
          {
            key: 'reset-pass-2',
            label: 'Reset Password',
            url: '/auth-2/reset-password',
          },
          { key: 'new-pass-2', label: 'New Password', url: '/auth-2/new-password' },
          { key: 'two-factor-2', label: 'Two Factor', url: '/auth-2/two-factor' },
          { key: 'lock-screen-2', label: 'Lock Screen', url: '/auth-2/lock-screen' },
          { key: 'success-mail-2', label: 'Success Mail', url: '/auth-2/success-mail' },
          { key: 'login-pin-2', label: 'Login with PIN', url: '/auth-2/login-pin' },
          {
            key: 'delete-account-2',
            label: 'Delete Account',
            url: '/auth-2/delete-account',
          },
        ],
      },
      {
        key: 'version-3',
        label: 'Version 3',
        parentKey: 'auth',
        children: [
          { key: 'sign-in-3', label: 'Sign In', url: '/auth-3/sign-in' },
          { key: 'sign-up-3', label: 'Sign Up', url: '/auth-3/sign-up' },
          {
            key: 'reset-pass-3',
            label: 'Reset Password',
            url: '/auth-3/reset-password',
          },
          { key: 'new-pass-3', label: 'New Password', url: '/auth-3/new-password' },
          { key: 'two-factor-3', label: 'Two Factor', url: '/auth-3/two-factor' },
          { key: 'lock-screen-3', label: 'Lock Screen', url: '/auth-3/lock-screen' },
          { key: 'success-mail-3', label: 'Success Mail', url: '/auth-3/success-mail' },
          { key: 'login-pin-3', label: 'Login with PIN', url: '/auth-3/login-pin' },
          {
            key: 'delete-account-3',
            label: 'Delete Account',
            url: '/auth-3/delete-account',
          },
        ],
      },
    ],
  }
  

]

export const horizontalMenuItems: MenuItemType[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: TbLayoutDashboard,
    url: '/dashboard',
  },
 
]
