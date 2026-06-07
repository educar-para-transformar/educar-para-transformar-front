import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { MainLayout } from './shared/components/layout/MainLayout';
import { HomePage } from './pages/home/HomePage';
import { AboutPage } from './pages/about/AboutPage';
import { LevelsPage } from './pages/levels/LevelsPage';
import { BienestarPage } from './pages/BienestarPage';
import { NewsPage } from './pages/news/NewsPage';
import { JobsPage } from './pages/jobs/JobsPage';
import { LoginPage } from './pages/login/LoginPage';
import { EnrollmentPage } from './pages/enrollment/EnrollmentPage';
import { OpinionsPage } from './pages/opiniones/OpinionsPage';
import { RegistrationPage } from './pages/registration/RegistrationPage';
import { ScrollToTop } from './shared/components/ScrollToTop';
import { AdminLayout } from './pages/admin/AdminLayout';
import { GestionNoticiasPage } from './pages/admin/GestionNoticiasPage';
import { CrearNoticiaPage } from './pages/admin/CrearNoticiaPage';
import { StudentRegistrationPage } from './pages/admin/StudentRegistrationPage';
import { EnrollmentRequestsPage } from './pages/admin/EnrollmentRequestsPage';
import { OpinionModerationPage } from './pages/admin/OpinionModerationPage';
import { CuentasDelSistemaPage } from './pages/admin/CuentasDelSistemaPage';
import { ForoLayout } from './pages/foro/ForoLayout';
import { ForoFeedPage } from './pages/foro/ForoFeedPage';
import { ForoThreadPage } from './pages/foro/ForoThreadPage';
import { ForoProfilePage } from './pages/foro/ForoProfilePage';
import { TeacherLayout } from './pages/teacher/TeacherLayout';
import { TeacherDashboardPage } from './pages/teacher/TeacherDashboardPage';
import { FamilyLayout } from './pages/family/FamilyLayout';
import { FamilyDashboardPage } from './pages/family/FamilyDashboardPage';
import { getRoleHomePath, getSession } from './features/auth/services/demoAuth';
import type { DemoUserRole } from './features/auth/types';

const PublicLayout = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

const RoleProtectedRoute = ({
  allowedRoles,
  children,
}: {
  allowedRoles: DemoUserRole[];
  children: ReactNode;
}) => {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(session.role)) {
    return <Navigate to={getRoleHomePath(session.role)} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/quienes-somos" element={<AboutPage />} />
          <Route path="/niveles" element={<LevelsPage />} />
          <Route path="/bienestar" element={<BienestarPage />} />
          <Route path="/noticias" element={<NewsPage />} />
          <Route path="/empleo" element={<JobsPage />} />
          <Route path="/inscripcion" element={<EnrollmentPage />} />
          <Route path="/registro" element={<RegistrationPage />} />
          <Route path="/opiniones" element={<OpinionsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route
          path="/privado"
          element={
            <RoleProtectedRoute allowedRoles={['authority']}>
              <AdminLayout />
            </RoleProtectedRoute>
          }
        >
          <Route index element={<Navigate to="solicitudes" replace />} />
          <Route path="solicitudes" element={<EnrollmentRequestsPage />} />
          <Route path="opiniones" element={<OpinionModerationPage />} />
          <Route path="noticias" element={<GestionNoticiasPage />} />
          <Route path="crear-noticia" element={<CrearNoticiaPage />} />
          <Route path="editar-noticia/:id" element={<CrearNoticiaPage />} />
          <Route path="crear-usuario" element={<StudentRegistrationPage />} />
          <Route path="cuentas" element={<CuentasDelSistemaPage />} />
        </Route>

        <Route
          path="/privado/foro"
          element={
            <RoleProtectedRoute allowedRoles={['student', 'parent']}>
              <ForoLayout />
            </RoleProtectedRoute>
          }
        >
          <Route index element={<ForoFeedPage />} />
          <Route path="discusion/:id" element={<ForoThreadPage />} />
          <Route path="perfil" element={<ForoProfilePage />} />
        </Route>

        <Route
          path="/docentes"
          element={
            <RoleProtectedRoute allowedRoles={['teacher']}>
              <TeacherLayout />
            </RoleProtectedRoute>
          }
        >
          <Route index element={<TeacherDashboardPage />} />
        </Route>

        <Route
          path="/familias"
          element={
            <RoleProtectedRoute allowedRoles={['parent']}>
              <FamilyLayout />
            </RoleProtectedRoute>
          }
        >
          <Route index element={<FamilyDashboardPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
