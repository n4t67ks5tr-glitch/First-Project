using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float minX = -4f;
    public float maxX = 4f;

    void Update()
    {
        // Input.GetMouseButton/mousePosition also work for touch on mobile:
        // Unity's legacy Input Manager maps the first touch to mouse input automatically.
        if (Input.GetMouseButton(0))
        {
            Vector3 targetPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            float clampedX = Mathf.Clamp(targetPos.x, minX, maxX);
            transform.position = new Vector3(clampedX, transform.position.y, transform.position.z);
        }
    }
}
