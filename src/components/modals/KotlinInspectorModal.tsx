import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, FileCode, Smartphone, Layers, Download } from 'lucide-react';

interface KotlinInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface KotlinFile {
  name: string;
  category: string;
  code: string;
}

export const KOTLIN_CODE_SNIPPETS: KotlinFile[] = [
  {
    name: 'MainActivity.kt',
    category: 'Entrypoint',
    code: `package com.skillverse.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.skillverse.app.ui.navigation.SkillVerseNavGraph
import com.skillverse.app.ui.theme.SkillVerseTheme

/**
 * SkillVerse Native Android Application
 * Tagline: Learn One. Teach One. Grow Together.
 */
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SkillVerseTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    SkillVerseNavGraph()
                }
            }
        }
    }
}`
  },
  {
    name: 'NavGraph.kt',
    category: 'Navigation Compose',
    code: `package com.skillverse.app.ui.navigation

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.Explore
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.SwapHoriz
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.*
import com.skillverse.app.ui.screens.*

sealed class Screen(val route: String, val title: String, val icon: ImageVector? = null) {
    object Splash : Screen("splash", "Splash")
    object Auth : Screen("auth", "Sign In")
    object Home : Screen("home", "Home", Icons.Default.Home)
    object Explore : Screen("explore", "Explore", Icons.Default.Explore)
    object MySkills : Screen("my_skills", "My Skills", Icons.Default.Book)
    object Requests : Screen("requests", "Requests", Icons.Default.SwapHoriz)
    object Wallet : Screen("wallet", "Wallet")
    object Profile : Screen("profile", "Profile", Icons.Default.Person)
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SkillVerseNavGraph() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val bottomBarScreens = listOf(
        Screen.Home,
        Screen.Explore,
        Screen.MySkills,
        Screen.Requests,
        Screen.Profile
    )

    val showBottomBar = currentRoute in bottomBarScreens.map { it.route }

    Scaffold(
        bottomBar = {
            if (showBottomBar) {
                NavigationBar(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                ) {
                    bottomBarScreens.forEach { screen ->
                        val selected = currentRoute == screen.route
                        NavigationBarItem(
                            selected = selected,
                            onClick = {
                                navController.navigate(screen.route) {
                                    popUpTo(navController.graph.findStartDestination().id) {
                                        saveState = true
                                    }
                                    launchSingleTop = true
                                    restoreState = true
                                }
                            },
                            icon = {
                                Icon(
                                    imageVector = screen.icon ?: Icons.Default.Home,
                                    contentDescription = screen.title
                                )
                            },
                            label = { Text(screen.title) },
                            colors = NavigationBarItemDefaults.colors(
                                indicatorColor = MaterialTheme.colorScheme.primaryContainer
                            )
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Splash.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.Splash.route) {
                SplashScreen(onGetStarted = {
                    navController.navigate(Screen.Auth.route) {
                        popUpTo(Screen.Splash.route) { inclusive = true }
                    }
                })
            }
            composable(Screen.Auth.route) {
                AuthScreen(onLoginSuccess = {
                    navController.navigate(Screen.Home.route) {
                        popUpTo(Screen.Auth.route) { inclusive = true }
                    }
                })
            }
            composable(Screen.Home.route) {
                HomeScreen(
                    onNavigateToExplore = { navController.navigate(Screen.Explore.route) },
                    onNavigateToMySkills = { navController.navigate(Screen.MySkills.route) },
                    onNavigateToRequests = { navController.navigate(Screen.Requests.route) },
                    onNavigateToWallet = { navController.navigate(Screen.Wallet.route) }
                )
            }
            composable(Screen.Explore.route) { ExploreScreen() }
            composable(Screen.MySkills.route) { MySkillsScreen() }
            composable(Screen.Requests.route) { RequestsScreen() }
            composable(Screen.Wallet.route) { WalletScreen() }
            composable(Screen.Profile.route) {
                ProfileScreen(onLogout = {
                    navController.navigate(Screen.Auth.route) {
                        popUpTo(0)
                    }
                })
            }
        }
    }
}`
  },
  {
    name: 'Theme.kt',
    category: 'Material 3 Theme',
    code: `package com.skillverse.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

// SkillVerse Palette: Navy Blue, Purple, Lavender, White
val NavyBluePrimary = Color(0xFF0F172A)
val PurpleAccent = Color(0xFF7C3AED)
val LavenderTone = Color(0xFFDDD6FE)
val SurfaceDark = Color(0xFF0B0F19)
val SurfaceVariantDark = Color(0xFF1E1B4B)
val GoldSkillCoin = Color(0xFFF59E0B)

private val DarkColorScheme = darkColorScheme(
    primary = PurpleAccent,
    onPrimary = Color.White,
    primaryContainer = Color(0xFF4C1D95),
    onPrimaryContainer = LavenderTone,
    secondary = LavenderTone,
    background = SurfaceDark,
    surface = SurfaceDark,
    surfaceVariant = SurfaceVariantDark,
    onBackground = Color.White,
    onSurface = Color.White,
    tertiary = GoldSkillCoin
)

@Composable
fun SkillVerseTheme(
    darkTheme: Boolean = true,
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        typography = Typography(),
        content = content
    )
}`
  },
  {
    name: 'HomeScreen.kt',
    category: 'UI Screen',
    code: `package com.skillverse.app.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.skillverse.app.ui.theme.GoldSkillCoin
import com.skillverse.app.ui.theme.LavenderTone

@Composable
fun HomeScreen(
    onNavigateToExplore: () -> Unit,
    onNavigateToMySkills: () -> Unit,
    onNavigateToRequests: () -> Unit,
    onNavigateToWallet: () -> Unit
) {
    var skillCoins by remember { mutableStateOf(150) }

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        item {
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Hello, Student! 👋",
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onBackground
            )
            Text(
                text = "Computer Science & Engineering · 3rd Year",
                fontSize = 13.sp,
                color = Color.Gray
            )
        }

        // SkillCoin Balance Card
        item {
            Card(
                shape = RoundedCornerShape(24.dp),
                colors = CardDefaults.cardColors(
                    containerColor = MaterialTheme.colorScheme.surfaceVariant
                ),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(20.dp)) {
                    Text(
                        text = "VIRTUAL SKILLCOIN BALANCE",
                        fontSize = 11.sp,
                        fontWeight = FontWeight.SemiBold,
                        color = LavenderTone
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Row(verticalAlignment = Alignment.Bottom) {
                        Text(
                            text = "$skillCoins",
                            fontSize = 36.sp,
                            fontWeight = FontWeight.ExtraBold,
                            color = Color.White
                        )
                        Spacer(modifier = Modifier.width(8.dp))
                        Text(
                            text = "SkillCoins",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = GoldSkillCoin
                        )
                    }
                    Spacer(modifier = Modifier.height(12.dp))
                    Button(
                        onClick = onNavigateToWallet,
                        shape = RoundedCornerShape(12.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
                    ) {
                        Text("Open Wallet & History")
                    }
                }
            }
        }

        // Quick Access Grid
        item {
            Text(
                text = "QUICK ACTIONS",
                fontSize = 12.sp,
                fontWeight = FontWeight.Bold,
                color = Color.LightGray
            )
            Spacer(modifier = Modifier.height(8.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                ActionCard("Explore Skills", Icons.Default.Explore, onNavigateToExplore, Modifier.weight(1f))
                ActionCard("My Skills", Icons.Default.Book, onNavigateToMySkills, Modifier.weight(1f))
                ActionCard("Requests", Icons.Default.SwapHoriz, onNavigateToRequests, Modifier.weight(1f))
            }
        }
    }
}

@Composable
fun ActionCard(
    title: String,
    icon: androidx.compose.ui.graphics.vector.ImageVector,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        onClick = onClick,
        shape = RoundedCornerShape(16.dp),
        colors = CardDefaults.cardColors(containerColor = Color(0xFF1E293B)),
        modifier = modifier.height(90.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(12.dp),
            verticalArrangement = Arrangement.SpaceBetween
        ) {
            Icon(icon, contentDescription = title, tint = LavenderTone)
            Text(title, fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.White)
        }
    }
}`
  },
  {
    name: 'Models.kt',
    category: 'Data Models',
    code: `package com.skillverse.app.data.model

data class Student(
    val id: String,
    val name: String,
    val avatarUrl: String,
    val department: String,
    val year: String,
    val bio: String,
    val rating: Double,
    val reviewCount: Int,
    val skillsOffered: List<SkillItem>,
    val skillsWanted: List<String>
)

data class SkillItem(
    val id: String,
    val name: String,
    val category: String,
    val level: String,
    val costPerSession: Int,
    val description: String = ""
)

enum class RequestStatus {
    PENDING, ACCEPTED, REJECTED, COMPLETED
}

data class ExchangeRequest(
    val id: String,
    val senderName: String,
    val receiverName: String,
    val skillName: String,
    val coins: Int,
    val status: RequestStatus,
    val isIncoming: Boolean
)`
  }
];

export const KotlinInspectorModal: React.FC<KotlinInspectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedFile, setSelectedFile] = useState<KotlinFile>(KOTLIN_CODE_SNIPPETS[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
        <div className="absolute inset-0" onClick={onClose}></div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative z-10 w-full max-w-4xl h-[85vh] bg-slate-900 rounded-3xl border border-purple-800/60 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center">
                <FileCode className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  Kotlin + Jetpack Compose Architecture
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-mono">
                    Android 14 Ready
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Native Android Material 3 source implementation for SkillVerse
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy File</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Body: File List + Code Viewer */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* File Sidebar */}
            <div className="w-full md:w-56 bg-slate-950/80 border-b md:border-b-0 md:border-r border-slate-800 p-2 overflow-x-auto md:overflow-y-auto no-scrollbar flex md:flex-col gap-1 shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 hidden md:block">
                Project Files
              </span>
              {KOTLIN_CODE_SNIPPETS.map((file) => (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all whitespace-nowrap flex items-center justify-between ${
                    selectedFile.name === file.name
                      ? 'bg-purple-600/30 text-purple-200 border border-purple-500/50 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span className="truncate">{file.name}</span>
                  <span className="text-[9px] text-slate-500 ml-2 hidden md:inline">
                    {file.category}
                  </span>
                </button>
              ))}
            </div>

            {/* Code Content */}
            <div className="flex-1 p-4 bg-slate-950 overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed select-text">
              <div className="flex items-center justify-between text-slate-500 pb-2 mb-2 border-b border-slate-800/80 text-[11px]">
                <span>// {selectedFile.name} — {selectedFile.category}</span>
                <span>Language: Kotlin 2.0 / Jetpack Compose M3</span>
              </div>
              <pre className="overflow-x-auto text-[11px] font-mono text-purple-200/95 leading-relaxed">
                {selectedFile.code}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
