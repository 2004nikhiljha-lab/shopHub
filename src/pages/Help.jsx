import { useState } from 'react';
import { Search, MessageCircle, Mail, Phone, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      category: 'Orders & Shipping',
      questions: [
        {
          q: 'How long does shipping take?',
          a: 'Standard shipping typically takes 5-7 business days. Express shipping is available for 2-3 business day delivery. Free shipping is offered on orders over ₹50.'
        },
        {
          q: 'Can I track my order?',
          a: 'Yes! Once your order ships, you will receive a tracking number via email. You can also track your order by visiting the Track Order page and entering your order number.'
        },
        {
          q: 'How can I change or cancel my order?',
          a: 'Orders can be modified or cancelled within 1 hour of placement. Please contact our customer service team immediately if you need to make changes.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 30-day return policy for most items. Products must be unused and in original packaging. Simply initiate a return through your account or contact customer service.'
        },
        {
          q: 'How long do refunds take?',
          a: 'Refunds are processed within 5-7 business days after we receive your return. The funds will be credited back to your original payment method.'
        },
        {
          q: 'Do I have to pay for return shipping?',
          a: 'Return shipping is free for defective items or our errors. For other returns, a ₹5.99 shipping fee will be deducted from your refund.'
        }
      ]
    },
    {
      category: 'Payment & Security',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are securely encrypted.'
        },
        {
          q: 'Is my payment information secure?',
          a: 'Yes, we use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers.'
        }
      ]
    },
    {
      category: 'Account & Profile',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click on the "Register" link in the top navigation bar and fill out the registration form. You can also create an account during checkout.'
        },
        {
          q: 'I forgot my password. What should I do?',
          a: 'Click on "Forgot Password" on the login page. Enter your email address and we will send you instructions to reset your password.'
        }
      ]
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone Support',
      description: '+1 (555) 123-4567',
      detail: 'Mon-Fri, 9AM-6PM EST',
      color: 'blue'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'support@shophub.com',
      detail: 'We reply within 24 hours',
      color: 'green'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with us now',
      detail: 'Average response: 2 minutes',
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <HelpCircle className="mx-auto mb-4" size={48} />
          <h1 className="text-4xl font-bold mb-4">How Can We Help You?</h1>
          <p className="text-xl text-blue-100 mb-8">
            Search our help center or contact our support team
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contact Methods */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              const colorClasses = {
                blue: 'bg-blue-100 text-blue-600',
                green: 'bg-green-100 text-green-600',
                purple: 'bg-purple-100 text-purple-600'
              };
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                  <div className={`${colorClasses[method.color]} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-900 font-medium mb-1">{method.description}</p>
                  <p className="text-sm text-gray-600">{method.detail}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openFaq === globalIndex;
                    
                    return (
                      <div key={faqIndex}>
                        <button
                          onClick={() => toggleFaq(globalIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                        >
                          <span className="text-left font-semibold text-gray-900">{faq.q}</span>
                          {isOpen ? (
                            <ChevronUp className="text-blue-600 flex-shrink-0" size={20} />
                          ) : (
                            <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still Need Help */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-xl text-blue-100 mb-6">
            Our support team is ready to assist you
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}