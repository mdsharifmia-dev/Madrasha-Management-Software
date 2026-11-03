import 'package:flutter/material.dart';

void main() {
  runApp(const MadrashaApp());
}

class MadrashaApp extends StatelessWidget {
  const MadrashaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'জাতীয় মাদ্রাসা ম্যানেজমেন্ট',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF059669), // Emerald
          brightness: Brightness.dark,
        ),
        useMaterial3: true,
      ),
      home: const MobileHomeScreen(),
    );
  }
}

class MobileHomeScreen extends StatefulWidget {
  const MobileHomeScreen({super.key});

  @override
  State<MobileHomeScreen> createState() => _MobileHomeScreenState();
}

class _MobileHomeScreenState extends State<MobileHomeScreen> {
  int _currentIndex = 0;

  final List<Widget> _views = const [
    ParentDashboardView(),
    AttendanceView(),
    HifzTrackerView(),
    FeesPaymentView(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('মাদ্রাসা অভিভাবক অ্যাপ'),
        centerTitle: true,
      ),
      body: _views[_currentIndex],
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex,
        onDestinationSelected: (index) => setState(() => _currentIndex = index),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home), label: 'হোম'),
          NavigationDestination(icon: Icon(Icons.calendar_today), label: 'হাজিরা'),
          NavigationDestination(icon: Icon(Icons.menu_book), label: 'হিফজ'),
          NavigationDestination(icon: Icon(Icons.payment), label: 'বেতন ও ফি'),
        ],
      ),
    );
  }
}

class ParentDashboardView extends StatelessWidget {
  const ParentDashboardView({super.key});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text('মুহাম্মদ আব্দুল্লাহ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  Text('হিফজ ৩য় বর্ষ | রোল: ০১ | DHK-2026-0001', style: TextStyle(color: Colors.grey)),
                  SizedBox(height: 12),
                  Text('আজকের হাজিরা: উপস্থিত (Present)', style: TextStyle(color: Colors.green, fontWeight: FontWeight.bold)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text('কুরআন হিফজ অগ্রগতি: ১০% (৬০ / ৬০৪ পৃষ্ঠা)', style: TextStyle(fontWeight: FontWeight.bold)),
                  SizedBox(height: 8),
                  LinearProgressIndicator(value: 0.1, color: Colors.green),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class AttendanceView extends StatelessWidget {
  const AttendanceView({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('মাসিক হাজিরা রেকর্ড ক্যালেন্ডার'));
}

class HifzTrackerView extends StatelessWidget {
  const HifzTrackerView({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('দৈনিক সবক, সাত সবকী ও আমুক্তা ডায়েরি'));
}

class FeesPaymentView extends StatelessWidget {
  const FeesPaymentView({super.key});
  @override
  Widget build(BuildContext context) => const Center(child: Text('বিকাশ ও নগদ দিয়ে অনলাইন ফি পরিশোধ'));
}
