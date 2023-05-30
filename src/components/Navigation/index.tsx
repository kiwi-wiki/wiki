import { NavItem } from '@/components/Navigation/NavItem.client';
import { getNavigationRoutes } from '@/utils/navigation';

export function Navigation() {
  const routes = getNavigationRoutes();

  return (
    <nav className="h-full flex overflow-y-scroll flex-col px-2">
      <ul className="visible flex flex-col">
        {routes.map(route => (
          <NavItem route={route} key={route.name} />
        ))}
      </ul>
    </nav>
  );
}
