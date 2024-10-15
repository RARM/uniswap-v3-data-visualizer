'use client';
import React from 'react';

// FIXME: This manual import and mapping could be improved in the future with
// dyanmic importing of UI components.
import HorizontalBar from '@/app/ui/ui-components/horizontal-bar';
import Table from '@/app/ui/ui-components/table';

const UIComponentsMap = {
  'HorizontalBar': HorizontalBar,
  'Table': Table
};
// End of FIXME.

export type UISection = {
  heading: string;
  description?: string;
  order: number;
  components: Array<{
    subheading?: string;
    description?: string;
    component: string;
    props: any;
  }>
};

export type UIControllerProps = {
  sections: Promise<Array<UISection>>;
}

const UIController: React.FC<UIControllerProps> = ({ sections }) => {
  const [resolvedSections, setResolvedSections] = React.useState<UISection[]>([]);

  React.useEffect(() => {
    sections.then(setResolvedSections);
  }, [sections]);

  return (
    <div>
      {resolvedSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 backdrop-filter backdrop-blur-lg rounded mb-4 p-4 shadow-lg">
          <h1 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{section.heading}</h1>
          {section.description && <p className="mb-2 text-gray-700 dark:text-gray-300">{section.description}</p>}
          {section.components.map((component, componentIndex) => {
            const Component = UIComponentsMap[component.component as keyof typeof UIComponentsMap];
            return (
              <div key={componentIndex} className="mb-4">
                {component.subheading && <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">{component.subheading}</h3>}
                {component.description && <p className="mb-1 text-gray-700 dark:text-gray-300">{component.description}</p>}
                <Component {...component.props} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default UIController;