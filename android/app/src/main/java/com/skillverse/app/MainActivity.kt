package com.skillverse.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.skillverse.app.ui.navigation.SkillVerseNavGraph
import com.skillverse.app.ui.theme.SkillVerseTheme

/**
 * SkillVerse Native Android Application
 * Tagline: Learn One. Teach One. Grow Together.
 * Campus peer-to-peer skill exchange platform using virtual SkillCoins.
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
}
