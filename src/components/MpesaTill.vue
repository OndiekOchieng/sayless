<!-- <script setup lang="ts">
import { useState, useRef } from 'react';

export default function MpesaPosterGenerator() {
  const [paymentType, setPaymentType] = useState('till');
  const [paymentNumber, setPaymentNumber] = useState('3547844');
  const [businessName, setBusinessName] = useState('');
  const posterRef = useRef(null);

  const handleDownload = async () => {
    const element = posterRef.current;
    if (!element) return;

    try {
      const html2canvas = (await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm')).default;
      
      const canvas = await html2canvas(element, {
        scale: 3,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        height: 1123,
      });

      const link = document.createElement('a');
      link.download = `mpesa-${paymentType}-${paymentNumber}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const getTitle = () => {
    switch(paymentType) {
      case 'till': return 'Till Number';
      case 'paybill': return 'Paybill Number';
      case 'pochi': return 'Pochi la Biashara';
      default: return 'Till Number';
    }
  };
  </script>
  <template>


    <div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-8">
      <div class="max-w-4xl mx-auto space-y-8">
        {/* Controls */}
        <div class="bg-white rounded-xl shadow-2xl p-6 space-y-6">
          <h1 class="text-3xl font-bold text-gray-800 text-center">M-Pesa Poster Generator</h1>
          
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Payment Type
              </label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="till">Till Number</option>
                <option value="paybill">Paybill Number</option>
                <option value="pochi">Pochi la Biashara</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                {getTitle()}
              </label>
              <input
                type="text"
                value={paymentNumber}
                onChange={(e) => setPaymentNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder="Enter number"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Business Name (Optional)
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Enter business name"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            onClick={handleDownload}
            class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors shadow-lg"
          >
            Download A4 Poster
          </button>
        </div>

        {/* Poster Preview */}
        <div class="bg-gray-100 rounded-xl p-8 shadow-2xl">
          <div 
            ref={posterRef}
            class="bg-white mx-auto"
            style={{ width: '794px', height: '1123px' }}
          >
            {/* Header */}
            <div class="bg-green-600 pt-16 pb-12">
              <h2 class="text-8xl font-bold text-white text-center px-8">
                Lipa na M-PESA
              </h2>
            </div>

            {/* Business Name */}
            {businessName && (
              <div class="bg-white py-8">
                <h3 class="text-5xl font-bold text-gray-800 text-center px-8">
                  {businessName}
                </h3>
              </div>
            )}

            {/* Payment Number */}
            <div class="bg-white py-16 px-8">
              <h3 class="uppercase text-center mb-8 text-green-600 text-6xl font-extrabold">
                {getTitle()}
              </h3>
              <div class="flex justify-center gap-4 flex-wrap">
                {paymentNumber.split('').map((digit, index) => (
                  <span
                    key={index}
                    class="border-4 border-green-600 px-8 py-6 text-black text-8xl font-extrabold rounded-lg"
                  >
                    {digit}
                  </span>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div class="bg-white px-8 pb-12">
              <p class="text-gray-800 text-center font-bold text-3xl uppercase tracking-wide">
                {paymentType === 'paybill' 
                  ? 'Make payments from any network' 
                  : 'Make payments from any network'}
              </p>
            </div>

            {/* Network Logos */}
            <div class="bg-white px-8 pb-16">
              <div class="flex justify-center items-center gap-12">
                <div class="text-center">
                  <div class="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-2xl">Airtel</span>
                  </div>
                </div>
                <div class="text-center">
                  <div class="w-32 h-32 bg-green-600 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-2xl">M-PESA</span>
                  </div>
                </div>
                <div class="text-center">
                  <div class="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center">
                    <span class="text-white font-bold text-2xl">Telkom</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

   -->