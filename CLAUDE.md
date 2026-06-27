# Kaebon Lead Configurator

## Project Goal

Build a premium visual lead configurator for Kaebon. The app will run on app.kaebon.com. This is not an e-commerce shop and not a checkout system. It is a guided inquiry form with a premium configurator-like experience.

## Product Definition

The user visually configures a boat and submits the configuration as an inquiry. The Kaebon sales team receives the full configuration and contact details, then contacts the user personally.

## Important: Not a Shop

Do not build:

* checkout
* cart
* payment
* online ordering
* user accounts for visitors
* inventory logic
* ERP logic

The final CTA is not "Buy" or "Order".
The final CTA should be:

* "Konfiguration anfragen"
* "Persönliches Angebot erhalten"
* "Beratung anfordern"
* "Meine Bootskonfiguration senden"

## Target Domain

Production domain:
app.kaebon.com

## MVP Scope

* One boat model
* Multi-step guided form
* Visual boat preview using optional image layers
* Usage selection
* Design options
* Equipment options
* Contact details form
* Configuration summary
* Lead submission API route
* Email notification to sales
* Thank-you page

## Later Scope

* Store leads in Supabase or another database
* Admin dashboard
* Lead status management
* PDF summary
* CRM integration
* Multi-language setup

## Recommended Tech Stack

* Next.js App Router
* TypeScript
* Tailwind CSS
* React Hook Form
* Zod
* Vercel hosting
* Email provider via environment variables
* Optional database later

## User Journey

1. User lands on the configurator.
2. User selects or confirms a boat model.
3. User selects intended usage.
4. User selects design options.
5. User selects equipment options.
6. User reviews the configuration summary.
7. User enters contact details.
8. User submits the inquiry.
9. User sees a premium thank-you page.
10. Sales receives the full lead information.

## UX Direction

The interface should feel premium, calm, clean and marine. It should feel more like a high-end automotive configurator than a normal form. The boat preview should be large and emotional. The form should be guided and easy to understand. Use generous spacing, elegant typography, clear option cards and a strong visual hierarchy.

## Architecture Rules

* Keep options data-driven.
* Do not hard-code option labels inside UI components.
* Keep form steps in a data file.
* Keep visual layer rendering separate from form logic.
* Keep email templates separate from API route logic.
* Keep validation schemas separate.
* Keep components small and readable.
* Use TypeScript types.
* Do not introduce unnecessary complexity.
* Always explain larger changes before making them.

## Suggested Folder Structure

app/
page.tsx
configurator/
page.tsx
thank-you/
page.tsx
api/
leads/
route.ts

components/
configurator/
ConfiguratorShell.tsx
StepNavigation.tsx
BoatPreview.tsx
OptionStep.tsx
OptionCard.tsx
ContactStep.tsx
ConfigurationSummary.tsx

ui/
Button.tsx
Input.tsx
Card.tsx
Checkbox.tsx
Select.tsx

data/
boatModels.ts
configuratorSteps.ts

lib/
leadSchema.ts
emailTemplates.ts
configurationSummary.ts
leadId.ts

public/
boats/
kaebon-650/
base.webp
layers/

## Quality Rules

Before considering a task complete:

* Run npm run lint if available.
* Run npm run build if possible.
* Check that the app works locally.
* Check mobile and desktop layout.
* Check that form validation works.
* Check that the lead payload contains configuration and contact data.
