import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import RecipeList from './pages/RecipeList'
import RecipeEdit from './pages/RecipeEdit'
import UserList from './pages/UserList'
import TagManage from './pages/TagManage'
import IngredientManage from './pages/IngredientManage'
import ConfigManage from './pages/ConfigManage'
import ABTestManage from './pages/ABTestManage'
import RecommendManage from './pages/RecommendManage'
import CommentManage from './pages/CommentManage'
import CheckInManage from './pages/CheckInManage'
import AchievementManage from './pages/AchievementManage'
import NotificationManage from './pages/NotificationManage'
import FileManage from './pages/FileManage'
import ShareManage from './pages/ShareManage'
import FavoriteManage from './pages/FavoriteManage'
import UserProfile from './pages/UserProfile'
import TimerManage from './pages/TimerManage'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('admin_token')
  if (!token) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AuthGuard><AdminLayout /></AuthGuard>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="recipes" element={<RecipeList />} />
          <Route path="recipes/edit/:id" element={<RecipeEdit />} />
          <Route path="recipes/new" element={<RecipeEdit />} />
          <Route path="users" element={<UserList />} />
          <Route path="tags" element={<TagManage />} />
          <Route path="ingredients" element={<IngredientManage />} />
          <Route path="abtest" element={<ABTestManage />} />
          <Route path="recommendation" element={<RecommendManage />} />
          <Route path="config" element={<ConfigManage />} />
          <Route path="comments" element={<CommentManage />} />
          <Route path="checkin" element={<CheckInManage />} />
          <Route path="achievements" element={<AchievementManage />} />
          <Route path="notifications" element={<NotificationManage />} />
          <Route path="files" element={<FileManage />} />
          <Route path="shares" element={<ShareManage />} />
          <Route path="favorites" element={<FavoriteManage />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="timers" element={<TimerManage />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
