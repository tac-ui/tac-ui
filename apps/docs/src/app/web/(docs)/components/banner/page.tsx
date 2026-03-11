'use client';

import React from 'react';
import { Banner } from '@tac-ui/web';
import {
  DocPage,
  DocTitle,
  DocDescription,
  DocSection,
  Showcase,
  PropsTable,
  DocText,
  PreviewCode,
} from '@/components/docs/DocPage';
import { Info, AlertTriangle, XCircle, CheckCircle } from '@tac-ui/icon';
import { usePageTranslation } from '@/i18n';
import { Playground } from '@/components/docs/Playground';

export default function BannerPage() {
  const pt = usePageTranslation('banner');

  return (
    <DocPage>
      <div>
        <DocTitle>{pt?.title ?? 'Banner'}</DocTitle>
        <DocDescription>
          {pt?.description ??
            'A full-width page-level notification bar placed at the top of a page or section to communicate important information.'}
        </DocDescription>
      </div>

      <DocSection title="Import">
        <PreviewCode code={`import { Banner } from '@tac-ui/web';`} />
      </DocSection>

      <DocSection title="Playground">
        <DocText>Interactively configure the Banner props below.</DocText>
        <Playground
          controls={{
            variant: {
              type: 'select',
              label: 'Variant',
              options: ['default', 'warning', 'error', 'success'],
              defaultValue: 'default',
            },
            dismissible: {
              type: 'boolean',
              label: 'Dismissible',
              defaultValue: false,
            },
          }}
          render={(values) => (
            <Banner
              variant={values.variant as 'default' | 'warning' | 'error' | 'success'}
              dismissible={values.dismissible as boolean}
              title="System notification"
              description="This is a banner with the selected configuration."
            />
          )}
          code={(values) =>
            `<Banner
  variant="${values.variant}"${values.dismissible ? '\n  dismissible' : ''}
  title="System notification"
  description="This is a banner with the selected configuration."
/>`
          }
        />
      </DocSection>

      <DocSection title={pt?.sections?.['default']?.title ?? 'Default'}>
        <DocText>
          {pt?.sections?.['default']?.texts?.[0] ??
            'The default variant uses the info color tokens and is suitable for general informational banners.'}
        </DocText>
        <Showcase
          code={`<Banner
  title="New feature available"
  description="Try the updated dashboard experience in your settings."
/>`}
        >
          <Banner
            title="New feature available"
            description="Try the updated dashboard experience in your settings."
          />
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['variants']?.title ?? 'Variants'}>
        <DocText>
          {pt?.sections?.['variants']?.texts?.[0] ??
            'Four semantic variants communicate the nature of the notification. Each applies matching background and border colors from the design token system.'}
        </DocText>
        <Showcase
          code={`<Banner variant="default" title="Info" description="A new software update is available." />
<Banner variant="success" title="Success" description="Your account has been verified." />
<Banner variant="warning" title="Warning" description="Your free trial expires in 3 days." />
<Banner variant="error" title="Error" description="Service disruption detected in your region." />`}
        >
          <div className="w-full flex flex-col">
            <Banner variant="default" title="Info" description="A new software update is available." />
            <Banner variant="success" title="Success" description="Your account has been verified." />
            <Banner variant="warning" title="Warning" description="Your free trial expires in 3 days." />
            <Banner variant="error" title="Error" description="Service disruption detected in your region." />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['with-icon']?.title ?? 'With Icon'}>
        <DocText>
          {pt?.sections?.['with-icon']?.texts?.[0] ??
            'Pass any React node to the icon prop to display a contextual icon on the left. The icon color is automatically matched to the variant.'}
        </DocText>
        <Showcase
          code={`<Banner variant="default" icon={<Info />} title="Maintenance window" description="Scheduled maintenance on Sunday from 2–4 AM UTC." />
<Banner variant="success" icon={<CheckCircle />} title="Deployment complete" description="Version 2.4.1 is now live." />
<Banner variant="warning" icon={<AlertTriangle />} title="Storage limit approaching" description="You have used 90% of your storage quota." />
<Banner variant="error" icon={<XCircle />} title="Payment failed" description="Please update your payment method to continue." />`}
        >
          <div className="w-full flex flex-col">
            <Banner
              variant="default"
              icon={<Info />}
              title="Maintenance window"
              description="Scheduled maintenance on Sunday from 2–4 AM UTC."
            />
            <Banner
              variant="success"
              icon={<CheckCircle />}
              title="Deployment complete"
              description="Version 2.4.1 is now live."
            />
            <Banner
              variant="warning"
              icon={<AlertTriangle />}
              title="Storage limit approaching"
              description="You have used 90% of your storage quota."
            />
            <Banner
              variant="error"
              icon={<XCircle />}
              title="Payment failed"
              description="Please update your payment method to continue."
            />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['dismissible']?.title ?? 'Dismissible'}>
        <DocText>
          {pt?.sections?.['dismissible']?.texts?.[0] ??
            'Set dismissible to show a close button. When clicked, the banner animates out and the optional onDismiss callback is fired.'}
        </DocText>
        <Showcase
          code={`<Banner
  variant="warning"
  icon={<AlertTriangle />}
  title="Trial ending soon"
  description="Your free trial ends in 2 days. Upgrade to keep access."
  dismissible
  onDismiss={() => console.log('dismissed')}
/>
<Banner
  variant="default"
  icon={<Info />}
  title="Cookie preferences"
  description="We use cookies to improve your experience."
  dismissible
/>`}
        >
          <div className="w-full flex flex-col gap-2">
            <Banner
              variant="warning"
              icon={<AlertTriangle />}
              title="Trial ending soon"
              description="Your free trial ends in 2 days. Upgrade to keep access."
              dismissible
            />
            <Banner
              variant="default"
              icon={<Info />}
              title="Cookie preferences"
              description="We use cookies to improve your experience."
              dismissible
            />
          </div>
        </Showcase>
      </DocSection>

      <DocSection title={pt?.sections?.['banner-vs-alert']?.title ?? 'Banner vs Alert'}>
        <DocText>
          {pt?.sections?.['banner-vs-alert']?.texts?.[0] ??
            'Banner and Alert serve different layout purposes. Use Banner for page-level or section-level notifications that span the full width — such as maintenance notices, trial expirations, or global system status. Banner uses a bottom border only and has no border radius, making it flush to the container edge.'}
        </DocText>
        <DocText>
          {pt?.sections?.['banner-vs-alert']?.texts?.[1] ??
            'Use Alert for inline content-level feedback within a form, card, or content area. Alert has a rounded border on all sides and is sized to its content. Both components share the same semantic variants and dismiss behavior.'}
        </DocText>
      </DocSection>

      <DocSection title={pt?.sections?.['api-reference']?.title ?? 'API Reference'}>
        <DocText>{pt?.sections?.['api-reference']?.texts?.[0] ?? 'Banner props:'}</DocText>
        <PropsTable
          data={[
            {
              name: 'variant',
              type: '"default" | "warning" | "error" | "success"',
              default: '"default"',
              description: pt?.props?.['variant'] ?? 'Visual style variant of the banner.',
            },
            {
              name: 'title',
              type: 'string',
              default: '-',
              description: pt?.props?.['title'] ?? 'Optional title displayed in bold.',
            },
            {
              name: 'description',
              type: 'string',
              default: '-',
              description: pt?.props?.['description'] ?? 'Optional description text shown below the title.',
            },
            {
              name: 'icon',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['icon'] ??
                'Optional icon displayed to the left. Icon color is matched to the variant.',
            },
            {
              name: 'dismissible',
              type: 'boolean',
              default: 'false',
              description:
                pt?.props?.['dismissible'] ??
                'When true, shows a close button that animates the banner out when clicked.',
            },
            {
              name: 'onDismiss',
              type: '() => void',
              default: '-',
              description:
                pt?.props?.['onDismiss'] ??
                'Called when the dismiss button is clicked, after the animation starts.',
            },
            {
              name: 'className',
              type: 'string',
              default: '-',
              description: pt?.props?.['className'] ?? 'Additional CSS class names.',
            },
            {
              name: 'children',
              type: 'React.ReactNode',
              default: '-',
              description:
                pt?.props?.['children'] ??
                'Optional custom content rendered inside the banner body.',
            },
          ]}
        />
      </DocSection>
    </DocPage>
  );
}
