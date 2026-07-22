import { Truck, ShieldCheck, BadgeCheck, Headphones, Icon } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable shipping on all orders.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "Your transactions are always safe and encrypted.",
  },
  {
    icon: BadgeCheck,
    title: "Official Warranty",
    description: "All products come with genuine warranty coverage.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is always here to help you.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-slate50 py-20">
        <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold">
                    Why Choose PCLove?
                </h2>

                <p className="mt-3 text-gray-500">
                    Everything you need for the ultimate gaming experience.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                        <div 
                            key={feature.title}
                            className="rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="mb-6 inline-flex rounded-xl bg-blue-100 p-4">
                                <Icon className="h-8 w-8 text-blue-600" />
                            </div>

                            <h3 className="text-xl font-semibold">
                                {feature.title}
                            </h3>

                            <p className="mt-3 leading-7 text-gray-500">
                                {feature.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  )
}

export default WhyChooseUs