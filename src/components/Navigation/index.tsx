import { NavItem } from '@/components/Navigation/NavItem.client';
import { getCateogryRoutes } from '@/utils/navigation';

export function Navigation() {
  const routes = getCateogryRoutes();

  return (
    <nav className="h-full flex overflow-y-scroll overscroll-contain flex-col px-2">
      <ul className="h-[calc(100vh-200px)] visible flex flex-col">
        {routes.map(route => (
          <NavItem route={route} key={route.name} />
        ))}
      </ul>
    </nav>
  );
}
