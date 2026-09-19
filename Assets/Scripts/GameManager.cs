using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    public static GameManager Instance { get; private set; }

    public Text scoreText;
    public Text livesText;
    public GameObject gameOverPanel;

    private int score;
    private int lives = 3;
    private bool isGameOver;

    void Awake()
    {
        Instance = this;
    }

    void Start()
    {
        gameOverPanel.SetActive(false);
        UpdateUI();
    }

    public void AddScore(int amount)
    {
        if (isGameOver) return;
        score += amount;
        UpdateUI();
    }

    public void LoseLife()
    {
        if (isGameOver) return;
        lives--;
        UpdateUI();
        if (lives <= 0)
        {
            GameOver();
        }
    }

    void UpdateUI()
    {
        scoreText.text = "Score: " + score;
        livesText.text = "Lives: " + lives;
    }

    void GameOver()
    {
        isGameOver = true;
        gameOverPanel.SetActive(true);
        // Freeze gameplay (falling items, spawner coroutine) without pausing UI input.
        Time.timeScale = 0f;
    }

    public void RestartGame()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }
}
